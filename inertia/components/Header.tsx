import {
  MegaMenu,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from 'flowbite-react'
import LogoutComponent from './Logout'
import { Link } from '@inertiajs/react'

type HeaderComponentProps = {
  isLoggedIn?: boolean
  user?: any
}
function HeaderComponent({ isLoggedIn, user }: HeaderComponentProps) {
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
            <Link href='/profile' className="mr-3">{user.username}</Link> <LogoutComponent />
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
      <NavbarToggle />
      <NavbarCollapse>
        <Link href="/">Home</Link>
        <Link href="#">Products</Link>
        <Link href="#">About</Link>
      </NavbarCollapse>
    </MegaMenu>
  )
}

export default HeaderComponent
