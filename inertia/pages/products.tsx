import { useEffect } from 'react'
import CategoriesComponent from '~/components/Categories'
import ProductsComponent from '~/components/Products'
import LayoutMain from '~/layouts/LayoutMain'

type ProductComponentProps = {
  numberCart: number // Nhận số lượng cart từ LayoutMain
}

function products({ numberCart }: ProductComponentProps) {
  console.log('numberCart in products:', numberCart)
  useEffect(() => {
    console.log('numberCart in products:', numberCart)
  }, [])

  return (
    <LayoutMain>
      <div className="p-10 grid md:grid-cols-4 grid-cols-5 gap-4">
        <div className="md:col-span-1 col-span-2">
          <CategoriesComponent />
        </div>
        <div className="md:col-span-3 col-span-3">
          <ProductsComponent />
        </div>
      </div>
    </LayoutMain>
  )
}

export default products
