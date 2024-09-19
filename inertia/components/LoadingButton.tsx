import { Button, Spinner } from 'flowbite-react'

type Props = {
  text: string
  loading?: boolean
  onClick?: () => void
  disabled?: boolean
  styles?: string
  type: 'button' | 'submit' | 'reset'
}

export function LoadingButtonComponent({ type, onClick, disabled, styles, loading, text }: Props) {
  return (
    <Button type={type} onClick={onClick} disabled={disabled} className={`relative ${styles}`}>
      <div>
        <span className={`transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {text}
        </span>
      </div>
      {loading && (
        <div className="absolute left-0 right-0 top-0  text-center flex items-center bottom-0 justify-center">
          <Spinner size="sm" />
        </div>
      )}
    </Button>
  )
}
