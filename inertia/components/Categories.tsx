import { Link, usePage } from '@inertiajs/react'
import _ from 'lodash'

type Category = {
  id: number
  name: string
  description: string
}

function CategoriesComponent() {
  const { categories } = usePage<{ categories: Category[] }>().props
  console.log('categories:', categories)

  return (
    <>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Categories</h2>
      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {_.isEmpty(categories) ? (
          <li>No categories found</li>
        ) : (
          <>
            {categories.map((item, index) => {
              return <li key={index}> <Link href={`product/category/${item.id}`}>{item.name}</Link></li>
            })}
          </>
        )}
      </ul>
    </>
  )
}

export default CategoriesComponent
