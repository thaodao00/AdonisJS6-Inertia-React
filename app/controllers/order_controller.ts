import Cart from '#models/cart'
import Order from '#models/order'
import { createOrderValidator } from '#validators/order'
import { HttpContext } from '@adonisjs/core/http'

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

    return inertia.render('order', { user: auth.user, isLoggedIn, orders })
  }
  public async createOrder({ auth, request, response }: HttpContext) {
    const { phone, address, status } = await request.validateUsing(createOrderValidator)
    if (auth.user) {
      const cart = await Cart.query()
        .where('user_id', auth.user.id)
        .preload('cartItems')
        .firstOrFail()
      const order = await Order.create({
        userId: Number(auth.user.id),
        phone,
        address,
        totalAmount: cart.totalPrice,
        status,
      })

      await order.related('orderItems').createMany(
        cart.cartItems.map((cartItem) => ({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        }))
      )
      await cart.related('cartItems').query().delete()
    }
    return response.redirect('/order')
  }
}
