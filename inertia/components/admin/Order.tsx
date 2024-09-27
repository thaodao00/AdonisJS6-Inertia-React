import { Link, usePage } from '@inertiajs/react'
import _ from 'lodash'
import useModal from '~/hooks/useModal'
import { useState } from 'react'
import PaginationComponent from '../Pagination'
import ModalUpdateStatus from './ModalUpdateStatus'
type User = {
  id: number
  username: string
  email: string
  roleId: number
}
type Order = {
  id: number
  status: string
  phone: string
  address: string
  user: User
  totalAmount: number
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

function Orders() {
  const { orders, user } = usePage<{
    users: User[]
    user: User
    orders: { data: Order[]; meta: MetaData }
  }>().props
  console.log(orders)

  const [data, setData] = useState<Order>()
  const modalUpdate = useModal()
  return (
    <>
      {_.isEmpty(orders?.data) ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No products found.</p>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.data?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.id}
                      </th>
                      <td className="px-6 py-4">{item.user.username}</td>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4">{item.phone}</td>
                      <td className="px-6 py-4">{item.address}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            modalUpdate.openModal()
                            setData(item)
                          }}
                          disabled={item.id === user.id}
                          className={`font-medium text-blue-600 dark:text-blue-500 hover:underline ${item.id === user.id && 'cursor-not-allowed opacity-50'}`}
                        >
                          Edit
                        </button>
                        <Link href={`/admin/orders/detail/${item.id}`}>
                          <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <PaginationComponent
            url="/admin/product"
            currentPage={orders?.meta?.currentPage}
            previousPageUrl={orders?.meta?.previousPageUrl}
            nextPageUrl={orders?.meta?.nextPageUrl}
            lastPage={orders?.meta?.lastPage}
          />
          {modalUpdate.isOpen && <ModalUpdateStatus close={modalUpdate.closeModal} order={data} />} 
        </div>
      )}
    </>
  )
}

export default Orders
