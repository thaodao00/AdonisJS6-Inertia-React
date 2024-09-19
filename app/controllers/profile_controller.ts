import { updateUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class ProfileController {
  public async index({ inertia, auth }: HttpContext) {
    let isLoggedIn = false
    let user = null
    await auth.check()
    if (auth.isAuthenticated) {
      isLoggedIn = true
      user = auth.user
    }

    return inertia.render('profile', { isLoggedIn, user })
  }
  public async update({ request, response, auth, session }: HttpContext) {
    let user: any = null
    await auth.check()
    if (auth.isAuthenticated) {
      user = auth.user
    }
    const data = await request.validateUsing(updateUserValidator, {
      meta: {
        userId: user!.id,
        pass: user.password,
      },
    })

    try {
      let isPasswordValid = false
      if (data.password) {
        isPasswordValid = await hash.verify(user.password, data.password)
        if (!isPasswordValid) {
          session.flash('errors', { password: 'Password is incorrect' })
          return response.redirect().back()
        }
        user.email = data.email
        user.username = data.username
        user.password = data.password
      }

      await user.save()
      session.flash('success', {
        message: 'Profile updated successfully',
      })
      response.redirect().back()
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }
  public async delete({ response, auth, session }: HttpContext) {
    let user: any = null
    await auth.check()
    if (auth.isAuthenticated) {
      user = auth.user
    }
    try {
      await user.delete()
      session.flash('success', {
        message: 'Deleted account successfully',
      })
      response.redirect().toRoute('/')
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}
