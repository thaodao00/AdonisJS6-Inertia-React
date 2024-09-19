import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
export default class UserController {
  public async index({ inertia, auth }: HttpContext) {
    const users = await User.all()

    return inertia.render('admin/users/list', { user: auth.user, users })
  }
  public async updateRole({ request, response,session }: HttpContext) {
    const { id, roleId } = request.all()

    const user = await User.findOrFail(id)
    user.roleId = roleId
    await user.save()
    session.flash('success', {
      message: 'Updated successfully',
    })
    return response.redirect().back()
  }
}
