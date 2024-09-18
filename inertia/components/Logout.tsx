import { useForm } from '@inertiajs/react'
import { LoadingButtonComponent } from './LoadingButton'

function LogoutComponent() {
  const { post, processing } = useForm()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/logout')
  }
  return (
    <form onSubmit={handleSubmit}>
      <LoadingButtonComponent
        text="Logout"
        loading={processing}
        type="submit"
        disabled={processing}
      />
    </form>
  )
}

export default LogoutComponent
