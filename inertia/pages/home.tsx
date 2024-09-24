import { Head, usePage } from '@inertiajs/react'
import LayoutMain from '~/layouts/LayoutMain'
import { SliderComponent } from '~/components/Slider'
import ImageComponent from '~/components/Image'

function Home() {
  return (
    <>
      <Head title="Home" />
      <LayoutMain>
        <div className=" p-10 gap-4 md:flex">
          <SliderComponent />
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 md:w-[40%] w-full md:mt-0 mt-[5px] ">
            <ImageComponent
              src="https://cf.shopee.vn/file/vn-11134258-7r98o-m04biq1z1q7h2b_xhdpi"
              alt="Description of the image"
              className="shadow-md mb-[5px]"
              width="w-[100%]"
              height="h-[49%]"
              objectFit="cover"
            />
            <ImageComponent
              src="https://cf.shopee.vn/file/vn-11134258-7r98o-m04bjl4fkzxp89_xhdpi"
              alt="Description of the image"
              className="shadow-md"
              width="w-[100%]"
              height="h-[49%]"
              objectFit="cover"
            />
          </div>
        </div>
      </LayoutMain>
    </>
  )
}
// Home.layout = (page: React.ReactNode) => (
//   <LayoutMain isLoggedIn user={user}>
//     {page}
//   </LayoutMain>
// )
export default Home
