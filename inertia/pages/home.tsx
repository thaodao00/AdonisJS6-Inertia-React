import { Head } from '@inertiajs/react'
import Version from './components/Version'
import { Button } from 'flowbite-react'
import { DrawerComponent } from './components/Drawer'

export default function Home(props: { version: number }) {
  console.log(1);
  
  return (
    <>
      <Head title="Homepage" />
      <div className="">
        <div className="title">
          AdonisJS <Version version={props.version} /> x Inertia x React
        </div>

        <span className='text-red-600'>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
      </div>
      <Button color="dark">Dark</Button>
      <DrawerComponent/>
    </>
  )
}
