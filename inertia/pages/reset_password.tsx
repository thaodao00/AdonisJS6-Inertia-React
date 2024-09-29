import { useForm, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function reset_password({ token, email }: { token: string; email: string }) {
  const { data, setData, post, processing, errors } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  })
  const { errors: error } = usePage<{ error: { message: string } }>().props
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/reset-password')
  }
  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return (
    <main>
      <div className="flex items-center h-screen px-2 sm:px-0">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 w-full max-w-sm sm:max-w-xl mx-auto p-4 rounded-xl shadow-md"
        >
          <div className="px-4 m-4 text-center">
            <h2 className="text-xl font-bold">Reset Password</h2>
          </div>
          <div className="inputs p-4 w-full">
            <div className="grid grid-cols-1 max-w-md mx-auto">
              <div className="form-group gap-2">
                <label className="block my-2" htmlFor="username">
                  Password
                </label>
                <input
                  className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && (
                  <p className="text-xs text-red-600 mt-2" id="password-error">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label className="block my-2" htmlFor="password">
                  Password confirmation
                </label>
                <div className="relative">
                  <input
                    className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                  />
                  {errors.password_confirmation && (
                    <p className="text-xs text-red-600 mt-2" id="password-error">
                      {errors.password_confirmation}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-300"
                    aria-label="Show password"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <svg
                      className="hidden"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-blue-700 text-gray-50 rounded-md shadow-sm px-3 py-2 my-4 hover:bg-blue-600"
                type="submit"
              >
                Reset password
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default reset_password
