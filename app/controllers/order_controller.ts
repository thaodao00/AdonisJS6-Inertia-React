import Cart from '#models/cart'
import Order from '#models/order'
import Product from '#models/product'
import { createOrderValidator } from '#validators/order'
import { HttpContext } from '@adonisjs/core/http'
import CartService from '../service/CartService.js'

export default class OrderController {
  public async index({ inertia, auth }: HttpContext) {
    let isLoggedIn = false
    await auth.check()
    if (auth.isAuthenticated) {
      isLoggedIn = true
    }

    const orders = auth.user
      ? await Order.query()
          .where('user_id', auth.user.id)
          .preload('orderItems', (orderItemsQuery) => {
            orderItemsQuery.preload('product')
          })
      : []
    const cart = await CartService.getUserCart(auth)
    return inertia.render('order', { user: auth.user, isLoggedIn, orders, cart })
  }
  // public async createOrder({ auth, request, response }: HttpContext) {
  //   const { phone, address, status } = await request.validateUsing(createOrderValidator)
  //   if (auth.user) {
  //     const cart = await Cart.query()
  //       .where('user_id', auth.user.id)
  //       .preload('cartItems')
  //       .firstOrFail()
  //     const order = await Order.create({
  //       userId: Number(auth.user.id),
  //       phone,
  //       address,
  //       totalAmount: cart.totalPrice,
  //       status,
  //     })

  //     await order.related('orderItems').createMany(
  //       cart.cartItems.map((cartItem) => ({
  //         productId: cartItem.productId,
  //         quantity: cartItem.quantity,
  //       }))
  //     )
  //     await cart.related('cartItems').query().delete()
  //   }
  //   return response.redirect('/order')
  // }
  public async createOrder({ auth, request, response, session }: HttpContext) {
    const { phone, address, status } = await request.validateUsing(createOrderValidator)

    if (auth.user) {
      // Lấy thông tin giỏ hàng của người dùng và các mục trong giỏ hàng
      const cart = await Cart.query()
        .where('user_id', auth.user.id)
        .preload('cartItems')
        .firstOrFail()

      // Kiểm tra tồn kho cho từng sản phẩm trong giỏ hàng
      for (const cartItem of cart.cartItems) {
        const product = await Product.findOrFail(cartItem.productId)
        if (product.stock < cartItem.quantity) {
          session.flash('errors', {
            message: `Product ${product.name} in stock is not enough. Please reorder with quantity less than or equal to: ${product.stock}`,
          })
          return response.redirect().back()
        }
      }

      // Tạo đơn hàng
      const order = await Order.create({
        userId: auth.user.id,
        phone: phone.toString(),
        address,
        totalAmount: cart.totalPrice,
        status,
      })

      // Tạo các mục đơn hàng từ giỏ hàng
      await order.related('orderItems').createMany(
        cart.cartItems.map((cartItem) => ({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        }))
      )

      // Cập nhật tồn kho cho từng sản phẩm
      for (const cartItem of cart.cartItems) {
        const product = await Product.findOrFail(cartItem.productId)
        product.stock -= cartItem.quantity
        await product.save()
      }

      // Xóa các mục trong giỏ hàng sau khi tạo đơn hàng
      await cart.related('cartItems').query().delete()

      // Lưu thông báo thành công vào session
      session.flash('success', { message: 'Order created successfully!' })
    }

    return response.redirect('/order')
  }
  public async showOrder({ request, inertia, auth }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10
    let isLoggedIn = false
    let user = null
    await auth.check()
    if (auth.isAuthenticated) {
      isLoggedIn = true
      user = auth.user
    }

    const orders = await Order.query().preload('user').paginate(page, limit)
    return inertia.render('admin/orders/list', { isLoggedIn, user, orders })
  }
  public async updateOrder({ request, response, session }: HttpContext) {
    const { id, status } = request.all()
    const order = await Order.findOrFail(id)
    order.status = status
    await order.save()
    session.flash('success', {
      message: 'Updated successfully',
    })
    return response.redirect().back()
  }
  public async showOrderDetail({ inertia, auth, params }: HttpContext) {
    const id = params.id
    let isLoggedIn = false
    let user = null
    await auth.check()
    if (auth.isAuthenticated) {
      isLoggedIn = true
      user = auth.user
    }
    const orders = await Order.query()
      .where('id', id)
      .preload('orderItems', (orderItemsQuery) => {
        orderItemsQuery.preload('product')
      })

    return inertia.render('admin/orders/detail', { isLoggedIn, user, orders })
  }
}
