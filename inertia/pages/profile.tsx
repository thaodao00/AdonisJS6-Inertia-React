import { usePage } from '@inertiajs/react'
import { TabsComponent } from '~/components/Tabs'
import LayoutMain from '~/layouts/LayoutMain'
type User = {
  id: number
  email: string
  username: string
  roleId: number
  created_at: string
  updated_at: string
}
type HomeProps = {
  isLoggedIn: boolean
  user: User
}
type FlashProps = {
  success?: string
}

function Profile({ isLoggedIn, user }: HomeProps) {
  const { props } = usePage<{ flash?: FlashProps }>();
  const flashMessage = props.flash?.success;
  console.log(flashMessage);
  
  return (
    <LayoutMain isLoggedIn={isLoggedIn} user={user}>
      <TabsComponent />
    </LayoutMain>
  )
}

export default Profile
