import { Link, router, usePage } from '@inertiajs/react'
import _ from 'lodash'

type Category = {
  id: number
  name: string
  description: string
}

function CategoriesComponent() {
  const { categories } = usePage<{ categories: Category[] }>().props
  const fetchProductsByCategory = (category_id: number) => {
    router.get(`/product/category`,{ category_id: category_id, page: 1 }, { preserveState: true })
  }
 
  return (
    <>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Categories</h2>
      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {_.isEmpty(categories) ? (
          <li>No categories found</li>
        ) : (
          <>
            {categories.map((item, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      fetchProductsByCategory(item.id)
                    }}
                    className="text-blue-500"
                  >
                    {item.name}
                  </button>
                </li>
              )
            })}
          </>
        )}
      </ul>
    </>
  )
}

export default CategoriesComponent
