import Category from '#models/category'
import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import fs from 'fs'
import path from 'path'

export default class ProductController {
  public async index({ inertia, auth }: HttpContext) {
    // const products = await Product.all()
    // console.log(products)
    return inertia.render('admin/products/list', { user: auth.user })
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
    console.log('image1:', image1)

    if (image1) {
      const fileName = `${cuid()}.${image1.extname}`
      console.log(fileName, 'fileName')

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
      await product.related('categories').attach(data.categories)
      console.log('Product', product)

      return response.redirect('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
      return response.status(500).send('Error creating product')
    }
  }

  public async showUpdate({ inertia, auth }: HttpContext) {
    const categories = await Category.all()
    return inertia.render('admin/products/update', { user: auth.user, categories })
  }
}
