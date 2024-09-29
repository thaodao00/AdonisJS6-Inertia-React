import { useForm, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { LoadingButtonComponent } from '~/components/LoadingButton'

function forgot_password() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  })
  const { errors: error, success } = usePage<{
    error: { message: string }
    success: { message: string }
  }>().props
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/forgot-password')
  }
  useEffect(() => {
    if (error?.message) {
      toast.error(error.message)
    }
  }, [error])
  useEffect(() => {
    if (success?.message) {
      toast.success(success.message)
    }
  }, [success])

  return (
    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
      <div className="mt-7 bg-white  rounded-xl shadow-lg">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <a className="text-blue-600 decoration-2 hover:underline font-medium" href="/login">
                Login here
              </a>
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      aria-describedby="email-error"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                    Please include a valid email address so we can get back to you
                  </p>
                </div>
                <LoadingButtonComponent
                  text="Reser password"
                  loading={processing}
                  type="submit"
                  disabled={processing}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default forgot_password
