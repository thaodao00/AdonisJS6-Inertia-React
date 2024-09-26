import Cart from "#models/cart"

class CartService {
  public async getUserCart(auth:any) {
    if (!auth.user) {
      return { cart: {} }
    }

    const cart = await Cart.query()
      .where('user_id', auth.user.id)
      .preload('cartItems')
      .first()

    return cart || { cart: {} }
  }
}

export default new CartService()
