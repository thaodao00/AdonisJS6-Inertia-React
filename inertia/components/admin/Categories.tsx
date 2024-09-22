import { Link, usePage } from '@inertiajs/react'
import _ from 'lodash'
import { useState } from 'react'
import useModal from '~/hooks/useModal'
import ModalUpdateCategory from './ModalUpdateCategory'
import ModalDeleteCategory from './ModalDeleteCategory'
type Category = {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
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

function Categories() {
  // const { categories } = usePage<{ categories: Category[] }>().props
  const modalUpdateCategory = useModal()
  const modalDeleteCategory = useModal()
  const [category, setCategory] = useState<Category>()
  const { categories } = usePage<{ categories: { meta: MetaData; data: Category[] } }>().props

  const items = []

  for (let i = 1; i <= categories?.meta?.lastPage; i++) {
    items.push(
      <li>
        <Link
          href={'?page=' + i}
          aria-current="page"
          className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        >
          {i}
        </Link>
      </li>
    )
  }

  return (
    <>
      {_.isEmpty(categories?.data) ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto ">
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md sm:rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category name
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.data.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          modalUpdateCategory.openModal()
                          setCategory(item)
                        }}
                        className={`font-medium text-blue-600 dark:text-blue-500 hover:underline`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          modalDeleteCategory.openModal()
                          setCategory(item)
                        }}
                        className={`ml-3 font-medium text-red-400 dark:text-blue-500 hover:underline`}
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
      )}
      {modalUpdateCategory.isOpen && (
        <ModalUpdateCategory category={category} close={modalUpdateCategory.closeModal} />
      )}
      {modalDeleteCategory.isOpen && (
        <ModalDeleteCategory category={category} close={modalDeleteCategory.closeModal} />
      )}
      <div className="flex justify-center items-center mt-4">
        {categories?.meta?.currentPage > 1 ? (
          <Link href={`/admin/categories${categories?.meta?.previousPageUrl}`}>
            <button className="px-4 py-2 bg-gray-200">Previous</button>
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-200" disabled>
            Previous
          </button>
        )}

        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 text-sm"> {items}</ul>
        </nav>

        {categories?.meta?.currentPage < categories?.meta?.lastPage ? (
          <Link href={`/admin/categories${categories?.meta?.nextPageUrl}`}>
            <button className="px-4 py-2 bg-gray-200">Next</button>
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-200">Next</button>
        )}
      </div>
    </>
  )
}

export default Categories
