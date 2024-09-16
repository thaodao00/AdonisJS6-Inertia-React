import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user';

export default class UsersController {
  public async index({ inertia }: HttpContext) {
    try {
      // Lấy tất cả người dùng từ cơ sở dữ liệu
      // const users = await User.all()
      const users = await User.query().select('id', 'email', 'username')
      // Render trang Inertia với dữ liệu người dùng
      return inertia.render('home', { users: users.map(user => user.toJSON()) })
    } catch (error) {
      // Xử lý lỗi và trả về thông báo lỗi nếu cần
      console.error('Error fetching users:', error)
      return inertia.render('home', { users: [] })
    }
  }
}
