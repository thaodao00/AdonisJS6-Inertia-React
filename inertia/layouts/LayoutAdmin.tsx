import { DrawerComponent } from '~/components/Drawer'
import { AvatarComponent } from '~/components/HeaderInfo'

type LayoutMainProps = {
  children: React.ReactNode
}
function LayoutAdmin({ children }: LayoutMainProps) {
  return (
    <div>
      <AvatarComponent />
      <DrawerComponent />
      <div className='md:pl-[300px] pl-10 pr-10 md:pt-[100px] pt-[30px]'>{children}</div>
    </div>
  )
}

export default LayoutAdmin
