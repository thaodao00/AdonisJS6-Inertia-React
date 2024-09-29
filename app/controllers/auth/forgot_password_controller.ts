import PasswordReset from '#models/password_reset'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import { HttpContext } from '@adonisjs/core/http'
import crypto from 'crypto'
import { forgotPasswordValidator, resetPasswordValidator } from '#validators/auth'
import { DateTime } from 'luxon'
export default class ForgotPasswordController {
  public forgotPassword({ inertia }: HttpContext) {
    return inertia.render('forgot_password')
  }
  public async sendResetLinkEmail({ request, session, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)
    const user = await User.findBy('email', email)

    if (!user) {
      session.flash('errors', { message: 'Email does not exist! ' })
      return response.redirect('back')
    }

    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    await PasswordReset.create({
      email: email,
      token: hashedToken,
      expiresAt: DateTime.now().plus({ hours: 1 }).toSQL(),
    })
    const resetUrl = `http://localhost:3333/reset-password?token=${token}&email=${email}`
    console.log(resetUrl)

    await mail.send((message) => {
      message
        .to(user.email)
        .subject('Đặt lại mật khẩu')
        .htmlView('emails/forgot_password', { user, resetUrl })
    })

    session.flash('success', { message: 'Email sent successfully' })
    return response.redirect('/forgot-password')
  }
  public async showResetForm({ inertia, request }: HttpContext) {
    const { token, email } = request.qs()
    return inertia.render('reset_password', { token, email })
  }
  public async reset({ request, session, response }: HttpContext) {
    const { email, token, password } = await request.validateUsing(resetPasswordValidator)
    console.log(email, token, password);
    
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const passwordReset = await PasswordReset.query()
      .where('email', email)
      .where('token', hashedToken)
      .where('expires_at', '>', DateTime.now().toJSDate())
      .first()
      console.log(passwordReset);
      
    if (!passwordReset) {
      session.flash('errors', { message: 'Token is invalid or expired.' })
      return response.redirect('back')
    }
    const user = await User.findBy('email', email)
    if (user) {
      user.password = password
      await user.save()
      if (passwordReset) {
        await passwordReset.delete()
      }
    }
    session.flash('success', { message: 'Password reset successfully' })
    return response.redirect('/login')
  }
}
