import { usePage } from '@inertiajs/react'
import _ from 'lodash'
import { LoadingButtonComponent } from '~/components/LoadingButton'
import LayoutAdmin from '~/layouts/LayoutAdmin'
type Category = {
  id: number
  name: string
}
type Props = {
  categories: Category[]
}
function create() {
  const { categories } = usePage<{ categories: Category[] }>().props
  console.log(categories);
  
  return (
    <LayoutAdmin>
      <form className="max-w-sm">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>

        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select categories
        </label>
        <fieldset className="mb-5">
          <legend className="sr-only">Checkbox variants</legend>
          {!_.isEmpty(categories) &&
            categories.map((category, index) => {
              return (
                <div className="flex items-center mb-4" key={index}>
                  <input
                    id="checkbox-1"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checkbox-1"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {category.name}
                  </label>
                </div>
              )
            })}
        </fieldset>

        <div className="mb-5">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>

        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         
          defaultValue={''}
        />
        <div className="mb-5">
          <label
            htmlFor="stock"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Stock
          </label>
          <input
            type="text"
            id="stock"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            
          />  
        </div>
        <LoadingButtonComponent
          type="submit"
          text="Add New"
          // loading={processing}
          // disabled={processing}
          styles="bg-blue-500 text-white"
        />
      </form>
    </LayoutAdmin>
  )
}

export default create
