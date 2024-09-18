import { Head, router, useForm, usePage } from '@inertiajs/react'
import { TextInput, Label } from 'flowbite-react'
import { Link } from '@inertiajs/react'
import _, { set } from 'lodash'
import { LoadingButtonComponent } from '~/components/LoadingButton'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

function Login() {
  const { data, setData, post, errors, processing } = useForm({
    email: '',
    password: '',
    errorMessage: '',
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/login')
  }
  useEffect(() => {
    if (errors.errorMessage) {
      toast.error(errors.errorMessage)
    }
  
  }, [errors])

  return (
    <div className="max-w-md mx-auto mt-10">
      <Head title="Login" />
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit}>
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

        <LoadingButtonComponent
          text="Login"
          loading={processing}
          type="submit"
          disabled={processing}
        />
      </form>

      <div className="mt-4">
        <Link href="/register">Create new account!</Link>
      </div>
    </div>
  )
}
// Login.layout=(page: React.ReactNode)=> <LayoutMain>{page}</LayoutMain>
export default Login
