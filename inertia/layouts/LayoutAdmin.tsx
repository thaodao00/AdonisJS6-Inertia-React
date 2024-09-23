import { useEffect, useState } from 'react'
import { DrawerComponent } from '~/components/Drawer'
import { AvatarComponent } from '~/components/HeaderInfo'

type LayoutMainProps = {
  children: React.ReactNode
}
function LayoutAdmin({ children }: LayoutMainProps) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div>
      {isClient && (
        <>
          <AvatarComponent />
          <DrawerComponent />
          <div className=" md:pl-[300px] pl-10 pr-10 pt-[100px] py-[30px] ">{children}</div>
        </>
      )}
    </div>
  )
}

export default LayoutAdmin
