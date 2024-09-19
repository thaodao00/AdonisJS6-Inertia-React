import { router, useForm, usePage } from '@inertiajs/react'
import { LoadingButtonComponent } from './LoadingButton'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
type User = {
  id: number
  email: string
  username: string
  roleId: number
  created_at: string
  updated_at: string
}
function TabProfile() {
  const { user, success } = usePage<{ user: User; success: { message?: string } }>().props
  const { data, setData, errors, processing, put } = useForm({
    email: user.email,
    username: user.username,
    password: '',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put('/update-profile')
  }
  useEffect(() => {
    if (success) {
      toast.success(success.message)
    }
  }, [success])
  const handleDelete = () => {
    router.delete('/delete-profile')
  }
  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Username
          </label>
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <LoadingButtonComponent
          text="Update"
          loading={processing}
          type="submit"
          disabled={processing || data.password == ''}
        />
      </form>
      <LoadingButtonComponent
        text="Delete"
        // loading={processing}
        onClick={handleDelete}
        // disabled={processing}
        type="button"
      />
    </>
  )
}

export default TabProfile
