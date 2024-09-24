import { useForm, usePage } from '@inertiajs/react'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { FileDrop } from 'react-file-drop'
import { toast } from 'react-toastify'
import { LoadingButtonComponent } from '~/components/LoadingButton'
import LayoutAdmin from '~/layouts/LayoutAdmin'

type Category = {
  id: number
  name: string
}
type Product = {
  id: number
  name: string
  image: string
  price: string
  description: string
  stock: string
  categories: Category[]
}

function update() {
  const { categories, product } = usePage<{ categories: Category[]; product: Product }>().props
  const { processing, errors, data, setData, recentlySuccessful, put } = useForm({
    id: product?.id,
    name: product?.name,
    categories: product?.categories.map((category) => category.id) || [],
    image: product?.image,
    price: product?.price,
    description: product?.description,
    stock: product?.stock,
  })
  console.log('product:', product)
  console.log(data)

  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  const [previewImage, setPreviewImage] = useState<string | null>(
    baseUrl + '/storage/' + product?.image || null
  )
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    console.log('file:', file)

    if (file) {
      setData('image', file)
      setPreviewImage(URL.createObjectURL(file))
      if (errors.image) {
        errors[e.target.name as keyof typeof errors] = undefined
      }
    }
  }
  console.log(previewImage);
  
  const handleImageRemove = () => {
    setPreviewImage(null)
    setData('image', '')
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(e.target.name as keyof typeof data, e.target.value)
    if (errors[e.target.name as keyof typeof errors]) {
      errors[e.target.name as keyof typeof errors] = undefined
    }
  }

  const handleCheckboxChange = (categoryId: number) => {
    if (data.categories.includes(categoryId)) {
      setData(
        'categories',
        data.categories.filter((id) => id !== categoryId)
      )
    } else {
      setData('categories', [...data.categories, categoryId])
    }
    if (errors.categories) {
      errors.categories = undefined
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  const res=  put('/admin/product/update')
  console.log(res);
  
  }
  const handleDrop = (files: FileList | null) => {
    if (files && files.length > 0) {
      handleImageChange({ target: { files } })
    }
  }

  useEffect(() => {
    if (recentlySuccessful) {
      toast.success('Product update successfully')
    }
  }, [recentlySuccessful])
  return (
    <LayoutAdmin>
      <form className="max-w-sm" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>

        <label
          htmlFor="categories"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select categories
        </label>
        <fieldset className="mb-5">
          <legend className="sr-only">Checkbox variants</legend>
          <div className="flex items-center flex-wrap gap-3">
            {!_.isEmpty(categories) &&
              categories.map((category, index) => {
                return (
                  <div key={index}>
                    <input
                      id={`checkbox-${category.id}`}
                      type="checkbox"
                      value={category.id}
                      checked={data.categories.includes(category.id)}
                      onChange={() => handleCheckboxChange(category.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-${category.id}`}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {category.name}
                    </label>
                  </div>
                )
              })}
            {errors.categories && <div className="text-red-500">{errors.categories}</div>}
          </div>
        </fieldset>
        <div className="mb-5">
          <label
            htmlFor="Image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <FileDrop onDrop={handleDrop}>
            {previewImage ? (
              <div className="mt-4 flex items-center">
                <img src={previewImage} alt="Preview" className="w-full h-64 object-contain mr-4" />
                <button
                  onClick={handleImageRemove}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={!!previewImage}
                  />
                </label>
              </div>
            )}
          </FileDrop>
          {errors.image && <div className="mb-5 text-red-500">{errors.image}</div>}
        </div>

        <div className="mb-5">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            name="price"
            value={data.price}
            onChange={handleChange}
            type="text"
            id="price"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {errors.price && <div className="text-red-500">{errors.price}</div>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
          {errors.description && <div className=" text-red-500">{errors.description}</div>}
        </div>

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
            name="stock"
            value={data.stock}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {errors.stock && <div className="text-red-500">{errors.stock}</div>}
        </div>
        <LoadingButtonComponent
          type="submit"
          text="Update"
          loading={processing}
          disabled={processing}
          styles="bg-blue-500 text-white"
        />
      </form>
    </LayoutAdmin>
  )
}

export default update
