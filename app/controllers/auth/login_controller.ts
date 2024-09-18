import User from '#models/user'
import { loginUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { handleError } from '../../utils/ErrorHelper.js'
export default class LoginController {
  public async show({ response, inertia, auth }: HttpContext) {
    if (await auth.check()) {
      return response.redirect('/')
    }
    return inertia.render('login')
  }
  public async store({ request, session, response, auth }: HttpContext) {
    const data = await request.validateUsing(loginUserValidator)
    try {
      const user = await User.verifyCredentials(data.email, data.password)
      await auth.use('web').login(user)
      return response.redirect().toRoute('/')
    } catch (error) {
      console.log(error)
      const errorMessage = handleError(error)
      session.flash('errors', { errorMessage })
      return response.redirect().back()
    }
  }
}
