import { router, usePage } from '@inertiajs/react'
import _ from 'lodash'
import { useState } from 'react'
import useModal from '~/hooks/useModal'
import ModalUpdateCategory from './ModalUpdateCategory'
import ModalDeleteCategory from './ModalDeleteCategory'
import PaginationComponent from '../Pagination'
import SearchCategory from './SearchComponent'
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
  const modalUpdateCategory = useModal()
  const modalDeleteCategory = useModal()
  const [category, setCategory] = useState<Category>()
  const { categories, search } = usePage<{
    categories: { data: Category[]; meta: MetaData }
    search: any
  }>().props
  console.log('categories:', categories);
  
  const [query, setQuery] = useState(search)
  console.log('search:', search);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.get('/admin/categories/search', { search: query, page: 1 }, { preserveState: true })
  }
  return (
    <>
      {_.isEmpty(categories?.data) ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto ">
          <SearchCategory handleSearch={handleSearch} query={query} setQuery={setQuery} />

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
          {_.isEmpty(query) ? (
            <PaginationComponent
              url="/admin/categories"
              currentPage={categories?.meta?.currentPage}
              previousPageUrl={categories?.meta?.previousPageUrl}
              nextPageUrl={categories?.meta?.nextPageUrl}
              lastPage={categories?.meta?.lastPage}
            />
          ) : (
            <PaginationComponent
              url={`/admin/categories/search`}
              currentPage={categories?.meta?.currentPage}
              previousPageUrl={categories?.meta?.previousPageUrl}
              nextPageUrl={categories?.meta?.nextPageUrl}
              lastPage={categories?.meta?.lastPage}
              query={query}
            />
          )}
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
