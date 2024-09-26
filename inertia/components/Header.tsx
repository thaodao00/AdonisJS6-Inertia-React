import { MegaMenu, NavbarBrand, NavbarCollapse, NavbarToggle } from 'flowbite-react'
import LogoutComponent from './Logout'
import { Link, usePage } from '@inertiajs/react'
import { CiShoppingCart } from 'react-icons/ci'
type User = {
  id: number
  username: string
  email: string
  role: string
  created_at: string
  updated_at: string
}
type CartItem = {
  id: number
  cartId: number
  productId: number
  quantity: number
  price: number
  created_at: string
  updated_at: string
}

function HeaderComponent() {
  const { isLoggedIn, user, cart } = usePage<{
    user: User
    isLoggedIn: boolean
    cart: { cartItems: CartItem[] }
  }>().props

  return (
    <MegaMenu>
      <NavbarBrand href="/">
        {/* <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Shoppes
        </span>
      </NavbarBrand>
      <div className="order-2 hidden items-center md:flex">
        {isLoggedIn && user ? (
          <>
            <Link href="/cart" className="mr-5 relative">
              <CiShoppingCart size={30} />
              <div>
                <span className="absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cart?.cartItems.length}
                </span>
              </div>
            </Link>

            <Link href="/profile" className="mr-3">
              {user.username}
            </Link>
            <LogoutComponent />
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
      <NavbarToggle />
      <NavbarCollapse>
        <Link href="/">Home</Link>
        <Link href="/product">Products</Link>
        <Link href="#">About</Link>
      </NavbarCollapse>
    </MegaMenu>
  )
}

export default HeaderComponent
