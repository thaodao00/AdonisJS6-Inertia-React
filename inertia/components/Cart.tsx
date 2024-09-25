import { Link, router, usePage } from '@inertiajs/react'
import _ from 'lodash'
import { useState } from 'react'
import useModal from '~/hooks/useModal'
import ModalDeleteCartItem from './ModalDeleteCartItem'
type Product = {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
}
type CartItem = {
  id: number
  cartId: number
  productId: number
  quantity: number
  product: Product
}

function CartComponent() {
  const { cart } = usePage<{ cart: { cartItems: CartItem[],totalPrice:number } }>().props
  console.log(cart)
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  const [product, setProduct] = useState<Product>()
  const handleUpadeCart = (productId: number, quantity: number) => {
    router.put('/cart/update', { productId, quantity })
  }
  // const [number, setNumber] = useState<{ [key: number]: boolean }>({})
  const modalDelete = useModal()
  return (
    <div className="container mx-auto mt-10">
      <div className="sm:flex shadow-md my-10">
        <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">3 Items</h2>
          </div>
          {_.isEmpty(cart?.cartItems) ? (
            <p className='my-10'>Cart not data!</p>
          ) : (
            <>
              {cart?.cartItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50"
                  >
                    <div className="md:w-4/12 2xl:w-1/4 w-full">
                      <img
                        src={baseUrl + '/storage/' + item.product.image}
                        alt="Black Leather Purse"
                        className="h-full object-center object-cover md:block hidden"
                      />
                    </div>
                    <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-end">
                      <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                        {item.product.name}
                      </p>
                      <div className="flex items-center justify-between w-full"></div>

                      <div className="flex items-center justify-between pt-5">
                        <div className="flex items-center">
                          <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                            Add to favorites
                          </p>
                          <button
                            onClick={() => {
                              modalDelete.openModal(), setProduct(item.product)
                            }}
                          >
                            <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer mr-3">
                              Remove
                            </p>
                          </button>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="flex items-center mr-3">
                            <button
                              className="bg-gray-200 rounded-l-lg px-2 py-1"
                              onClick={() => handleUpadeCart(item.productId, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="mx-2 text-gray-600">{item.quantity}</span>
                            <button
                              className="bg-gray-200 rounded-r-lg px-2 py-1"
                              onClick={() => handleUpadeCart(item.productId, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">
                          ${item.product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          )}
          <Link href="/product" className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
        <div id="summary" className=" w-full   sm:w-1/4   md:w-1/2     px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items 3</span>
            <span className="font-semibold text-sm">590$</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>{cart?.totalPrice}</span>
            </div>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
      {modalDelete.isOpen && (<ModalDeleteCartItem close={modalDelete.closeModal} product={product}/>)}
    </div>
  )
}

export default CartComponent
