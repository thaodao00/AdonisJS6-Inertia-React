import { useState, useEffect } from 'react'

const useCart = () => {
  const [cart, setCart] = useState(0)
  const handleSetValue = (value: number) => {
    setCart(value)
  }
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('/carts')
      console.log('response:', response)

      const data = await response.json()
      console.log(data)

      setCart(data?.cartItems?.length || 0)
    }

    fetchCart()
  }, [])

  return { cart, handleSetValue }
}

export default useCart
