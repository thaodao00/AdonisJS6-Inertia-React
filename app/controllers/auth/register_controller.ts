import Role from '#models/role'
import User from '#models/user'
import { createUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  public async show({ inertia,auth,response }: HttpContext) {
    if (await auth.check()) {
      return response.redirect('/')
    }
    return inertia.render('register')
  }
  public async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)
    const userRole = await Role.query().where('name', 'user').firstOrFail()
    try {
      const user = await User.create({
        email: data.email,
        username: data.username,
        password: data.password,
        roleId: userRole.id,
      })
     
      await auth.use('web').login(user)
      return response.redirect().toRoute('/login')
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }
}
