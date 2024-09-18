import { List, ListItem } from 'flowbite-react'

type User = {
  id: number
  email: string
  username: string
}
type ListUserProps = {
  users: User[]
}
function ListUser({ users }: ListUserProps) {
  return (
    <>
      {users.map((user) => (
        <List unstyled key={user.id}>
          <ListItem>{user.email}</ListItem>
        </List>
      ))}
    </>
  )
}

export default ListUser
