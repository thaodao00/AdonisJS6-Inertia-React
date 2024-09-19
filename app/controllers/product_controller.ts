import { HttpContext } from '@adonisjs/core/http';
export default class ProductController {
  public async index({ inertia, auth }: HttpContext) {
    // const products = await Product.all()
    // console.log(products)

    return inertia.render('admin/products/list', { user: auth.user })
  }
}
