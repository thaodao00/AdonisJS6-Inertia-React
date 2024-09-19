import { useForm, usePage } from '@inertiajs/react'
import { LoadingButtonComponent } from '../LoadingButton'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

type User = {
  id: number
  username: string
  email: string
  roleId: number
}
type ModalUpdateProps = {
  close: () => void
  user?: User
}

function ModalUpdate({ close, user }: ModalUpdateProps) {
  const { success } = usePage<{ success: { message: string } }>().props

  const { data, setData, put, processing,recentlySuccessful} = useForm({
    roleId: user?.roleId,
    id: user?.id,
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put('/admin/users/update-role')
  }
  useEffect(() => {
    if (recentlySuccessful) {
      toast.success(success?.message);
      close();
    }
  }, [recentlySuccessful]);
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-modal-bg">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Update</h3>
            <button
              onClick={close}
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Role
                </label>
                <select
                  name="role"
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={data?.roleId}
                  onChange={(e) => setData('roleId', Number(e.target.value))}
                >
                  <option value="2">Admin</option>
                  <option value="1">User</option>
                </select>
              </div>
              <div className="flex justify-end">
                <LoadingButtonComponent
                  type="submit"
                  text="Save"
                  loading={processing}
                  disabled={processing}
                />
                <button
                  type="button"
                  onClick={close}
                  className="ml-3 hover:bg-slate-50 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUpdate
