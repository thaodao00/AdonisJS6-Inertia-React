import { FooterComponent } from '~/components/Footer'
import HeaderComponent from '~/components/Header'
type User = {
  id: number
  email: string
  username: string
  roleId: number
  created_at: string
  updated_at: string
}
type LayoutMainProps = {
  children: React.ReactNode
  isLoggedIn: boolean
  user?: User
}
function LayoutMain({ children, isLoggedIn,user}: LayoutMainProps) {
  console.log(user);
  console.log(isLoggedIn);
  
  return (
    <>
      <HeaderComponent isLoggedIn={isLoggedIn} user ={user} />
      {children}
      <FooterComponent />
    </>
  )
}

export default LayoutMain
