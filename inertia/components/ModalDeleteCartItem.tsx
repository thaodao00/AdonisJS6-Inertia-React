import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { LoadingButtonComponent } from './LoadingButton'

type Product = {
  id: string
  name: string
}
type Props = {
  close: () => void
  product?: Product
}
function ModalDeleteCartItem({ close, product }: Props) {
  const {
    processing,

    recentlySuccessful,
    delete: destroy,
    wasSuccessful: recentlySucce,
  } = useForm({
    productId: product?.id,
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    destroy('/cart/delete')
  }
  useEffect(() => {
    if (recentlySucce) {
      close()
      toast.success('Delete successfully')
    }
  }, [recentlySuccessful])
  return (
    <div className="bg-modal-bg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={close}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <form className="p-4 md:p-5 text-center" onSubmit={handleSubmit}>
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this {product?.name}?
            </h3>
            <div className="flex justify-end">
              <LoadingButtonComponent
                type="submit"
                text=" Yes, I'm sure"
                loading={processing}
                disabled={processing}
                styles="bg-red-500 text-white"
              />

              <button
                onClick={close}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalDeleteCartItem
