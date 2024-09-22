import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Roles from '../enums/role.js'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AdminMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */

  async handle(ctx: HttpContext, next: NextFn) {
    const isAdmin = ctx.auth.user?.roleId === Roles.ADMIN

    if (!isAdmin) {
      return ctx.response.redirect().toRoute('/login')
    }
    const output = await next()
    return output
  }
}
