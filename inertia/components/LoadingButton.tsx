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
    <Button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`relative flex items-center justify-center ${styles}`}
  >
    {loading && (
      <div className="absolute left-10 text-center">
        <Spinner size="sm" />
      </div>
    )}
    <span className={`transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
      {text}
    </span>
  </Button>
  
  )
}
