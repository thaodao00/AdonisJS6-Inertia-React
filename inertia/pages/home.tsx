import { Head, usePage } from '@inertiajs/react'
import Version from './components/Version'
import { Button } from 'flowbite-react'
import { DrawerComponent } from './components/Drawer'
import ListUser from './components/ListUser'
type User = {
  id: number
  email: string
  username: string
}

type HomeProps = {
  users: User[]
}
export default function Home({ users }: HomeProps) {
  return (
    <>
      <Head title="Homepage" />
      <div className="">
        <div className="title">
          AdonisJS <Version version={6} /> x Inertia x React
        </div>

        <span className='text-red-600'>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
      </div>
      <Button color="dark">Dark</Button>
      <ListUser users ={users}/>
      <DrawerComponent/>
    </>
  )
}
