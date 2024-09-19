import { Head, useForm } from '@inertiajs/react'
import { TextInput, Label } from 'flowbite-react'
import { Link } from '@inertiajs/react'
import _ from 'lodash'
import { LoadingButtonComponent } from '~/components/LoadingButton'

function Register() {
  const { data, setData, post, errors, processing } = useForm({
    email: '',
    password: '',
    username: '',
    password_confirmation: '',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/register')
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Head title="Register" />
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="username" value="Username" />
          <TextInput
            id="username"
            type="text"
            value={data.username}
            onChange={(e) => setData('username', e.target.value)}
            color={errors.username ? 'failure' : 'default'}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <Label htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="text"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            color={errors.email ? 'failure' : 'default'}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <Label htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            color={errors.password ? 'failure' : 'default'}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <Label htmlFor="password_confirmation" value="Password confirmation" />
          <TextInput
            id="password_confirmation"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            color={errors.password_confirmation ? 'failure' : 'default'}
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
          )}
        </div>

        <LoadingButtonComponent
          text="Register"
          loading={processing}
          type="submit"
          disabled={processing}
        />
      </form>

      <div className="mt-4">
        <Link href="/login">Already have an account? Log in here.</Link>
      </div>
    </div>
  )
}
// Register.layout=(page: React.ReactNode)=> <LayoutMain>{page}</LayoutMain>
export default Register