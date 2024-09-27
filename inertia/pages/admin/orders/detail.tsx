import { Link, usePage } from '@inertiajs/react'
import _ from 'lodash'
import LayoutAdmin from '~/layouts/LayoutAdmin'
type Product = {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
}
type OrderItem = {
  id: number
  quantity: number
  product: Product
}
type Order = {
  id: number
  orderItems: OrderItem[]
  totalAmount: number
  status: string
  createdAt: string
  address: string
  phone: string
}
type User = {
  id: number
  username: string
  email: string
  phone: string
}
function detail() {
  const { orders, user } = usePage<{ orders: Order[]; user: User }>().props
  console.log(orders)
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  return (
    <LayoutAdmin>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        {!_.isEmpty(orders) ? (
          <>
            {orders?.map((order, index) => {
              return (
                <div key={index}>
                  <div className=" pl-3 flex justify-between item-start space-y-2">
                    <div>
                      <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                        Order #{order?.id}
                      </h1>
                      <p className="mt-3 text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                        {order?.createdAt}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold">
                        Status: <span className="font-medium">{order?.status}</span>
                      </h5>
                      <h5 className="font-bold">
                        Name: <span className="font-medium">{user?.username}</span>
                      </h5>
                      <h5 className="font-bold">
                        Phone number: <span className="font-medium">{order?.phone}</span>
                      </h5>
                      <h5 className="font-bold">
                        Address: <span className="font-medium">{order?.address}</span>
                      </h5>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                      <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                          Customer’s Cart
                        </p>
                        {order?.orderItems?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                            >
                              <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img
                                  className="w-full  md:block"
                                  src={baseUrl + '/storage/' + item?.product?.image}
                                  alt="dress"
                                />
                              </div>

                              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                  <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                    {item?.product?.name}
                                  </h3>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                  <p className="text-base dark:text-white xl:text-lg leading-6">
                                    ${item?.product?.price}
                                  </p>
                                  <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                    {item?.quantity}
                                  </p>
                                  <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                    ${item?.product?.price * item?.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4"></div>
                          <div className="flex justify-between items-center w-full">
                            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                              Total
                            </p>
                            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                              ${order?.totalAmount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>No order found.</p>
          </div>
        )}
      </div>
    </LayoutAdmin>
  )
}

export default detail
