import { Link, router, usePage } from '@inertiajs/react'
import _ from 'lodash'
import PaginationComponent from './Pagination'
import { LoadingButtonComponent } from './LoadingButton'
import ModalProduct from './ModalProduct'
import useModal from '~/hooks/useModal'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Category = {
  id: string
  name: string
  description: string
}
type Product = {
  id: string
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
  const { products, success } = usePage<{
    products: { data: Product[]; meta: MetaData }
    success: { message: string }
  }>().props

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
                    <Link href={`/product/detail/${item.id}`} className="mb-3">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-full text-ellipsis whitespace-nowrap overflow-hidden">
                        {item.name}
                      </h5>
                    </Link>

                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${item.price}
                    </span>
                    <div className="flex items-center justify-end mt-5">
                      {item.stock > 0 ? (
                        <LoadingButtonComponent
                          type="button"
                          text="Add to cart"
                          onClick={() => {
                            modalProduct.openModal(), setData(item)
                          }}
                        />
                      ) : (
                        <LoadingButtonComponent type="button" text="Out of stock" disabled={true} />
                      )}
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
