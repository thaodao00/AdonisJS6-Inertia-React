import { Link, router, usePage } from '@inertiajs/react'
import _ from 'lodash'
import PaginationComponent from './Pagination'
import { LoadingButtonComponent } from './LoadingButton'
import useCart from '~/hooks/userCart'
import ModalProduct from './ModalProduct'
import useModal from '~/hooks/useModal'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Category = {
  id: number
  name: string
  description: string
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
type MetaData = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}
function ProductsComponent() {
  const { products, success } = usePage<{ products: { data: Product[]; meta: MetaData },success:{message:string} }>().props
  console.log(success)

  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  const [data, setData] = useState<Product>()
  const modalProduct = useModal()
  useEffect(() => {
    if (success) {
      modalProduct.closeModal()
      toast.success(success?.message)
    }
  }, [success])
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3">
        {_.isEmpty(products?.data) ? (
          <p>No products found.</p>
        ) : (
          <>
            {products?.data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <img
                      className="p-8 rounded-t-lg"
                      src={baseUrl + '/storage/' + item.image}
                      alt="product image"
                    />
                  </a>
                  <div className="px-5 pb-5">
                    <Link href={`product/${item.id}`} className="mb-3">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-full text-ellipsis whitespace-nowrap overflow-hidden">
                        {item.name}
                      </h5>
                    </Link>

                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${item.price}
                    </span>
                    <div className="flex items-center justify-end mt-5">
                      {/* <Link
                        href="/cart"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </Link> */}
                      <LoadingButtonComponent
                        type="button"
                        text="Add to cart"
                        onClick={() => {
                          modalProduct.openModal(), setData(item)
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
      {!_.isEmpty(products?.data) && (
        <PaginationComponent
          url="/products"
          currentPage={products?.meta?.currentPage}
          previousPageUrl={products?.meta?.previousPageUrl}
          nextPageUrl={products?.meta?.nextPageUrl}
          lastPage={products?.meta?.lastPage}
        />
      )}
      {modalProduct.isOpen && <ModalProduct close={modalProduct.closeModal} data={data} />}
    </>
  )
}

export default ProductsComponent
