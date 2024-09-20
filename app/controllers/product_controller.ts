import Category from '#models/category'
import { HttpContext } from '@adonisjs/core/http'
export default class ProductController {
  public async index({ inertia, auth }: HttpContext) {
    // const products = await Product.all()
    // console.log(products)

    return inertia.render('admin/products/list', { user: auth.user })
  }

  public async showCreate({ inertia,auth }: HttpContext) {
    const categories = await Category.all()
    return inertia.render('admin/products/create',{user: auth.user,categories})

  }

  public async showUpdate({ inertia,auth }: HttpContext) {
    const categories = await Category.all()
    return inertia.render('admin/products/update',{user: auth.user,categories})
  }
}
