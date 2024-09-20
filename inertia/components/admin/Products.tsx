import { Link } from '@inertiajs/react'
import useModal from '~/hooks/useModal'
import ModalDeleteProduct from './ModalDeleteProduct'

function Products() {
  const modalProductDelete = useModal()
  return (
    <>
      <div className="mt-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">124</td>
              <td className="px-6 py-4">
                <Link
                  href="/admin/products/update"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button onClick={modalProductDelete.openModal} className="ml-3 font-medium text-red-400 dark:text-blue-500 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>

        </table>
        {modalProductDelete.isOpen &&<ModalDeleteProduct close={modalProductDelete.closeModal}/>}
      </div>
    </>
  )
}

export default Products
