import { HttpContext } from '@adonisjs/core/http'
export default class DashboardController {
  public async index({ inertia, auth }: HttpContext) {
    let isLoggedIn = false
    let user = null
    await auth.check()
    if (auth.isAuthenticated) {
      isLoggedIn = true
      user = auth.user
    }
    return inertia.render('admin/dashboard', { isLoggedIn, user })
  }
}
