import { usePage } from '@inertiajs/react'
import _ from 'lodash'
import { useState } from 'react'
import useModal from '~/hooks/useModal'
import ModalUpdateCategory from './ModalUpdateCategory'
import ModalDeleteCategory from './ModalDeleteCategory'

type Category = {
  id: number
  name: string
  description: string
}

function Categories() {
  const { categories } = usePage<{ categories: Category[] }>().props
  const modalUpdateCategory = useModal()
  const modalDeleteCategory = useModal()
  const [category, setCategory] = useState<Category>()

  return (
    <>
      {_.isEmpty(categories) ? (
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
              {categories.map((item, index) => {
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
    </>
  )
}

export default Categories
