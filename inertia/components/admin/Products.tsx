import { Link, usePage } from '@inertiajs/react'
import useModal from '~/hooks/useModal'
import ModalDeleteProduct from './ModalDeleteProduct'
import _ from 'lodash'
import FileImage from '../FileImage'
import PaginationComponent from '../Pagination'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaDownload } from 'react-icons/fa'
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

function Products() {
  const modalProductDelete = useModal()
  const { products, errors } = usePage<{ products: { data: Product[]; meta: MetaData } }>().props
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    if (errors?.error) {
      toast.error(errors?.error)
      modalProductDelete.closeModal()
    }
  }, [errors])
  // const handleDownload = (fileName: string) => {
  //   const cleanFileName = fileName.replace('uploads/', '')
  //   window.location.href = `/admin/download/${cleanFileName}`
  //   console.log('download:', cleanFileName);
  // }
  const handleDownload = (fileName: string) => {
    const cleanFileName = fileName.replace('uploads/', '')
    const link = document.createElement('a')
    link.href = `/admin/download/${cleanFileName}`
    link.download = cleanFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <>
      {_.isEmpty(products?.data) ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No products found.</p>
        </div>
      ) : (
        <>
          <div className="mt-5 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                Description
              </th> */}
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
                {products?.data.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex items-end">
                          <FileImage imagePath={item.image} />
                          <button onClick={() => handleDownload(item.image)}>
                            <FaDownload className="ml-3" />
                          </button>
                        </div>
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.name}
                      </th>
                      {/* <td className="px-6 py-4">{item.description}</td> */}
                      <td className="px-6 py-4">
                        <ul>
                          {item?.categories.map((category, index) => {
                            return <li key={index}>{category.name}</li>
                          })}
                        </ul>
                      </td>
                      <td className="px-6 py-4">{item.price}$</td>
                      <td className="px-6 py-4">{item.stock}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/product/update/${item.id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            modalProductDelete.openModal(), setProduct(item)
                          }}
                          className="ml-3 font-medium text-red-400 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <PaginationComponent
            url="/admin/product"
            currentPage={products?.meta?.currentPage}
            previousPageUrl={products?.meta?.previousPageUrl}
            nextPageUrl={products?.meta?.nextPageUrl}
            lastPage={products?.meta?.lastPage}
          />
        </>
      )}
      {modalProductDelete.isOpen && (
        <ModalDeleteProduct close={modalProductDelete.closeModal} product={product} />
      )}
    </>
  )
}

export default Products
