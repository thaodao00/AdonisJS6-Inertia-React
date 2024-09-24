import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({response, auth }: HttpContext) {
    await auth.use('web').logout()
    // return response.redirect().toRoute('login')
    // if (request.header('referer', '')?.includes('/admin')) {
    //   return response.redirect().toRoute('login')
    // }

    return response.redirect('/')
  }
}
