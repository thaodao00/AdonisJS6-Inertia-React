import Cart from '#models/cart'
import { HttpContext } from '@adonisjs/core/http'

export default class CartController {
  public async show({ auth, inertia }: HttpContext) {
    let isLoggedIn = false
    await auth.check()
    if (auth.isAuthenticated) {
      isLoggedIn = true
    }
    const cart = auth.user
      ? await Cart.query()
          .where('user_id', auth.user.id)
          .withCount('cartItems') // Kiểm tra số lượng cartItems
          .preload('cartItems', (cartItemsQuery) => {
            cartItemsQuery.preload('product') // Preload product trong từng cartItem
          })
          .first()
      : []

    return inertia.render('cart', { isLoggedIn, user: auth.user, cart })
  }
  public async addToCart({ request, response, auth, session }: HttpContext) {
    // Lấy dữ liệu từ request
    const { product_id, quantity } = request.only(['product_id', 'quantity'])
    try {
      // Tìm giỏ hàng của user, nếu không có thì tạo mới
      if (auth.user) {
        const cart = await Cart.firstOrCreate({ userId: auth.user.id })
        // Thêm sản phẩm vào giỏ hàng
        const existingItem = await cart
          .related('cartItems')
          .query()
          .where('product_id', product_id)
          .first()
        if (existingItem) {
          // Nếu sản phẩm đã có trong giỏ hàng thì cập nhật số lượng
          existingItem.quantity += quantity
          await existingItem.save()
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
          await cart.related('cartItems').create({
            productId: product_id,
            quantity,
          })
        }
        await this.updateCartTotalPrice(cart)
      }
      session.flash('success', { message: 'Added to cart successfully' })
      return response.redirect().back()
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }


  public async updateCart({ request, response, auth, session }: HttpContext) {
    const { productId, quantity } = request.only(['productId', 'quantity'])
    // Tìm giỏ hàng của người dùng
    let cart = null
    if (auth.user) {
      cart = await Cart.query().where('user_id', auth.user.id).preload('cartItems').first()
    }
    // Tìm sản phẩm trong giỏ hàng
    if (cart) {
      const cartItem = cart ? cart.cartItems.find((item) => item.productId === productId) : null
      if (quantity === 0 && cartItem) {
        await cartItem.delete()
        session.flash('success', { message: 'Product removed from cart' })
      }
      if (quantity > 0 && cartItem) {
        // Cập nhật số lượng sản phẩm
        cartItem.quantity = quantity
        await cartItem.save()
      }
      await this.updateCartTotalPrice(cart)
    }
    // session.flash('success', { message: 'Cart updated successfully' })
    return response.redirect().back()
  }
  public async deleteCart({ auth, request, session, response }: HttpContext) {
    const { productId } = request.only(['productId'])

    let cart = null
    if (auth.user) {
      cart = await Cart.query().where('user_id', auth.user.id).preload('cartItems').first()
    }
    const cartItem = cart ? cart.cartItems.find((item) => item.productId === productId) : null
    if (cart && cartItem) {
      await cartItem.delete()
      await this.updateCartTotalPrice(cart)
      session.flash('success', { message: 'Product removed from cart' })
    }
    return response.redirect().back()
  }
  private async updateCartTotalPrice(cart: Cart) {
    const cartItems = await cart.related('cartItems').query().preload('product')

    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.quantity * item.product.price
    }, 0)

    cart.totalPrice = totalPrice
    await cart.save()
  }
}
