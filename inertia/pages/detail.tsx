import { usePage } from '@inertiajs/react'
import ImageComponent from '~/components/Image'
import LayoutMain from '~/layouts/LayoutMain'
type Category = {
  id: number
  name: string
}

type Product = {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
  categories: Category[]
}
function detail() {
  const { product } = usePage<{ product: Product }>().props
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  return (
    <LayoutMain>
      <div className="p-10">
        <div className="grid grid-cols-5 gap-5">
          <div className="lg:col-span-2 col-span-5 flex justify-center">
            {/* <img
              src={baseUrl + '/storage/' + product?.image}
              alt="shopping image"
              className="object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            /> */}
            <ImageComponent width='w-ful' height='h-[560px]' alt={product?.name}  src={baseUrl + '/storage/' + product?.image} />
          </div>
          <form className="col-span-5 lg:col-span-3 flex-auto p-6">
            <div className="flex flex-wrap mb-3">
              <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">{product?.name}</h1>
              <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">
                ${product?.price}
              </div>
              <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                In stock: {product?.stock}
              </div>
            </div>
            {/* <div className="flex items-baseline mt-4 mb-6 text-gray-700 dark:text-gray-300">
              <div className="flex space-x-2">
                <label className="text-center">
                  <input
                    type="radio"
                    className="flex items-center justify-center w-6 h-6 accent-violet-600 bg-gray-100 rounded-lg dark:bg-gray-600"
                    name="size"
                    defaultValue="xs"
                  />
                  XS
                </label>
                <label className="text-center">
                  <input
                    type="radio"
                    className="flex items-center justify-center w-6 h-6 accent-violet-600"
                    name="size"
                    defaultValue="s"
                  />
                  S
                </label>
                <label className="text-center">
                  <input
                    type="radio"
                    className="flex items-center justify-center w-6 h-6 accent-violet-600"
                    name="size"
                    defaultValue="m"
                  />
                  M
                </label>
                <label className="text-center">
                  <input
                    type="radio"
                    className="flex items-center justify-center w-6 h-6 accent-violet-600"
                    name="size"
                    defaultValue="l"
                  />
                  L
                </label>
                <label className="text-center">
                  <input
                    type="radio"
                    className="flex items-center justify-center w-6 h-6 accent-violet-600"
                    name="size"
                    defaultValue="xl"
                  />
                  XL
                </label>
              </div>
              <a
                href="#"
                className="hidden ml-auto text-sm text-gray-500 underline md:block dark:text-gray-300"
              >
                Size Guide
              </a>
            </div> */}
            <div className="mb-5">
              <ul className="flex flex-col font-medium flex-wrap gap-2">
                Categories
                {product?.categories.map((category, index) => (
                  <li key={index} className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-5">
              <div className="font-medium">Description
                </div>
                <span> {product?.description}</span>
            </div>
            <div className="flex mb-4 text-sm font-medium">
              <button
                type="button"
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
              >
                Buy now
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Free shipping on all continental US orders.
            </p>
          </form>
        </div>
      </div>
    </LayoutMain>
  )
}

export default detail
