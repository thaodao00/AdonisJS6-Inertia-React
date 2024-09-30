import { Link, usePage } from '@inertiajs/react'
import _ from 'lodash'
type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
}
type OrderItem = {
  id: string
  quantity: number
  product: Product
}
type Order = {
  id: string
  orderItems: OrderItem[]
  totalAmount: number
  status: string
  createdAt: string
  address: string
  phone: string
}
type User = {
  id: string
  username: string
  email: string
  phone: string
}
function Orders() {
  const { orders, user } = usePage<{ orders: Order[]; user: User }>().props
  console.log(orders)
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      {!_.isEmpty(orders) ? (
        <>
          {orders?.map((order, index) => {
            return (
              <div key={index}>
                <div className="mt-10 pl-3 flex justify-between item-start space-y-2">
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
                        {/* <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Summary
              </h3> */}
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                          {/* <div className="flex justify-between w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$56.00</p>
                </div> */}
                          {/* <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Discount{' '}
                    <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                      STUDENT
                    </span>
                  </p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    -$28.00 (50%)
                  </p>
                </div> */}
                          {/* <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$8.00</p>
                </div> */}
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                            Total
                          </p>
                          <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                            ${order?.totalAmount}
                          </p>
                        </div>
                      </div>

                      {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Shipping
              </h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-8 h-8">
                    <img
                      className="w-full h-full"
                      alt="logo"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                      DPD Delivery
                      <br />
                      <span className="font-normal">Delivery with 24 Hours</span>
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                  $8.00
                </p>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                  View Carrier Details
                </button>
              </div>
            </div> */}
                    </div>
                  </div>
                  {/* <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                    David Kent
                  </p>
                  <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                    10 Previous Orders
                  </p>
                </div>
              </div>
              <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <img
                  className="dark:hidden"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                  alt="email"
                />
                <img
                  className="hidden dark:block"
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                  alt="email"
                />
                <p className="cursor-pointer text-sm leading-5 ">david89@gmail.com</p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    180 North King Street, Northhampton MA 1060
                  </p>
                </div>
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Billing Address
                  </p>
                  <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    180 North King Street, Northhampton MA 1060
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div> */}
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

      <Link href="/product" className="ml-5 flex font-semibold text-indigo-600 text-sm mt-10">
        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        Continue Shopping
      </Link>
    </div>
  )
}

export default Orders
