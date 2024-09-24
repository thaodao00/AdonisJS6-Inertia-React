import { useEffect, useState } from 'react'
import HeaderComponent from '~/components/Header'

type LayoutMainProps = {
  children: React.ReactNode
}
function LayoutMain({ children }: LayoutMainProps) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div className="">
      {isClient && (
        <>
          <div className="fixed top-0 left-0 right-0 h-[70px]">
            <HeaderComponent />
          </div>
          <div className='mt-[30px]'>{children}</div>
          {/* <FooterComponent />  */}
        </>
      )}
    </div>
  )
}

export default LayoutMain
