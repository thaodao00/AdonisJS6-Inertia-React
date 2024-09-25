import { useState } from 'react'
import ImageComponent from './Image'
import { LoadingButtonComponent } from './LoadingButton'
import { router } from '@inertiajs/react'
type Props = {
  close: () => void
  data: any
}

function ModalProduct({ close, data }: Props) {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  const [quantity, setQuantity] = useState(1)
  const plus = () => {
    if (data.stock === quantity) return
    setQuantity(quantity + 1)
  }
  const minus = () => {
    if (quantity === 1) return
    setQuantity(quantity - 1)
  }

  const addCart = (product_id: number, quantity: number) => {
    router.post('/cart/add', { product_id, quantity }, {})
  }
  return (
    <div className="bg-modal-bg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add to cart</h3>

            <button
              onClick={close}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <div className="mb-3 font-medium text-lg">{data?.name}</div>
            <div className="flex justify-center mb-3">
              <ImageComponent
                height="h-[300px]"
                width="w-[250px]"
                alt={'tên'}
                src={baseUrl + '/storage/' + data.image}
              />
            </div>
            <div className="mb-3 text-right font-medium text-lg">
              <p>${data?.price}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button className="bg-gray-200 rounded-l-lg px-2 py-1" onClick={minus}>
                  -
                </button>
                <span className="mx-2 text-gray-600">{quantity}</span>
                <button className="bg-gray-200 rounded-r-lg px-2 py-1" onClick={plus}>
                  +
                </button>
                <div className='ml-3'>In stock: {data?.stock}</div>
              </div>
              <LoadingButtonComponent
                text="Add cart"
                type="button"
                onClick={() => addCart(data.id, quantity)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalProduct
