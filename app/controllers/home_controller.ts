import type { HttpContext } from '@adonisjs/core/http'
import CartService from '../service/CartService.js'

export default class HomeController {
  public async index({ inertia, auth }: HttpContext) {
    let isLoggedIn = false
    let user = null
    await auth.check()
    if(auth.isAuthenticated){
        isLoggedIn = true
        user = auth.user
      }
      const cart = await CartService.getUserCart(auth)

    return inertia.render('home', { isLoggedIn, user,cart });
  }
}