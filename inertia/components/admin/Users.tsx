import { usePage } from '@inertiajs/react'
import _ from 'lodash'
import useModal from '~/hooks/useModal'
import ModalUpdate from './ModalUpdateUser'
import { useState } from 'react'
type User = {
  id: number
  username: string
  email: string
  roleId: number
}
function Users() {
  const { users,user } = usePage<{ users: User[],user:User }>().props
  console.log(users)
  const [data, setData] = useState<User>()
  const modalUpdate = useModal()
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg" >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.email}
                </th>
                <td className="px-6 py-4">{item.username}</td>
                <td className="px-6 py-4">{item.roleId === 1 ? 'User' : 'Admin'}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      modalUpdate.openModal()
                      setData(item)
                    }}
                    disabled={item.id === user.id}
                    className={`font-medium text-blue-600 dark:text-blue-500 hover:underline ${item.id === user.id && 'cursor-not-allowed opacity-50'}`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {modalUpdate.isOpen && <ModalUpdate close={modalUpdate.closeModal} user={data}/>}
    </div>
  )
}

export default Users
