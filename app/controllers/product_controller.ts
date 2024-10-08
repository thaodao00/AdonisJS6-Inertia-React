import Category from '#models/category'
import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import fs from 'fs'
import path from 'path'
import drive from '@adonisjs/drive/services/main'
import CartService from '../service/CartService.js'
import CartItems from '#models/cart_items'
import OrderItems from '#models/order_items'
import app from '@adonisjs/core/services/app'

export default class ProductController {
  public async index({ inertia, auth, request }: HttpContext) {
    // const products = await Product.all()
    const page = request.input('page', 1)
    const limit = 10
    const products = await Product.query().preload('categories').paginate(page, limit)
    return inertia.render('admin/products/list', { user: auth.user, products })
  }

  public async showCreate({ inertia, auth }: HttpContext) {
    const categories = await Category.all()
    return inertia.render('admin/products/create', { user: auth.user, categories })
  }
  public async createProduct({ request, response }: HttpContext) {
    const data = await request.validateUsing(createProductValidator)
    console.log('data:', data)

    const image1 = request.file('image')
    let filePath: string | undefined = undefined

    if (image1) {
      const fileName = `${cuid()}.${image1.extname}`

      const uploadPath = path.join('storage', 'uploads')
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true })
      }

      await image1.move(uploadPath, { name: fileName })
      filePath = `uploads/${fileName}`
    }

    try {
      const product = await Product.create({
        image: filePath,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      })
      console.log('product:', product)

      await product.related('categories').attach(data.categories)

      return response.redirect('/admin/product')
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  public async showUpdate({ inertia, auth, params }: HttpContext) {
    const id = params.id
    const product = await Product.query().where('id', id).preload('categories').firstOrFail()
    const categories = await Category.all()
    return inertia.render('admin/products/update', { user: auth.user, categories, product })
  }

  public async updateProduct({ request, response }: HttpContext) {
    const id = request.input('id')
    const data = await request.validateUsing(updateProductValidator, {
      meta: {
        productId: id,
      },
    })
    const product = await Product.findOrFail(id)

    try {
      const imageFile = request.file('image')
      let filePath: string | undefined = undefined
      if (imageFile) {
        const fileName = `${cuid()}.${imageFile.extname}`
        const uploadPath = path.join('storage', 'uploads')
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true })
        }
        await imageFile.move(uploadPath, { name: fileName })
        filePath = `uploads/${fileName}`
      }
      product.name = data.name
      product.description = data.description
      product.price = data.price
      product.stock = data.stock
      if (filePath) {
        product.image = filePath
      } else {
        product.image = product.image
      }
      await product.save()
      await product.related('categories').sync(data.categories)
      return response.redirect('/admin/product/update/' + id)
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  public async deleteProduct({ request, response, session }: HttpContext) {
    const id = request.input('id')
    const product = await Product.findOrFail(id)
    const imagePath = product.image
    try {
      const cartItemsCount = await CartItems.query().where('product_id', id).withCount('product')
      if (cartItemsCount.length > 0) {
        console.log('cartItemsCount:', cartItemsCount)
        session.flash('errors', { error: 'Product is in cart, cannot delete.' })
        return response.redirect().back()
      }
      const orderItemsCount = await OrderItems.query().where('product_id', id).withCount('product')
      if (orderItemsCount.length > 0) {
        session.flash('errors', { error: 'Product is in order, cannot delete.' })
        return response.redirect().back()
      }
      await product.delete()
      if (imagePath) {
        const fileExists = fs.existsSync(path.join('storage', imagePath))
        if (fileExists) {
          await drive.use().delete(imagePath)
        }
      }
      return response.redirect().back()
    } catch (error) {
      session.flash('errors', {
        error: 'An error occurred while deleting the product. Please try again later.',
      })
      console.error('Error deleting product:', error)
    }
  }
  public async showProducts({ inertia, auth, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10
    let isLoggedIn = false
    let user = null
    await auth.check()
    if (auth.isAuthenticated) {
      isLoggedIn = true
      user = auth.user
    }
    const cart = await CartService.getUserCart(auth)
    const products = await Product.query().preload('categories').paginate(page, limit)
    const categories = await Category.all()
    return inertia.render('products', { user: auth.user, isLoggedIn, products, categories, cart })
  }
  public async showProductDetail({ inertia, auth, params }: HttpContext) {
    const id = params.id
    let isLoggedIn = false
    let user = null
    await auth.check()
    if (auth.isAuthenticated) {
      isLoggedIn = true
      user = auth.user
    }
    const cart = await CartService.getUserCart(auth)

    const product = await Product.query().where('id', id).preload('categories').first()
    return inertia.render('detail', { user: auth.user, isLoggedIn, product, cart })
  }

  public async productByCategory({ inertia, auth, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10
    const categoryId = request.input('category_id', 0)
    const cart = await CartService.getUserCart(auth)
    let isLoggedIn = false
    let user = null
    await auth.check()
    if (auth.isAuthenticated) {
      isLoggedIn = true
      user = auth.user
    }
    const productsQuery = Product.query().preload('categories')

    if (categoryId) {
      productsQuery.whereHas('categories', (categoryQuery) => {
        categoryQuery.where('categories.id', categoryId)
      })
    }

    const products = await productsQuery.paginate(page, limit)
    const categories = await Category.all()
    return inertia.render('products', {
      user,
      isLoggedIn,
      products,
      categories,
      cart,
    })
  }

  public async downloadImage({ params, response }: HttpContext) {
    const fileName = params.fileName
    const filePath = app.makePath(path.normalize(`storage/uploads/${fileName}`))
  
    console.log('filePath:', fileName)
    console.log('filePath:', filePath)
  
    try {
       // Buộc trình duyệt tải tệp xuống
      return response.attachment(filePath, fileName)
    } catch (error) {
      console.log('Error downloading image:', error)
      return response.notFound({ message: 'File not found' })
    }
  }
}
