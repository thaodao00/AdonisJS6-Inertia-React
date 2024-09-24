import CategoriesComponent from '~/components/Categories'
import ProductsComponent from '~/components/Products'
import LayoutMain from '~/layouts/LayoutMain'

function products() {
  return (
    <LayoutMain>
      <div className="p-10 grid md:grid-cols-4 grid-cols-5 gap-4">
        <div className="md:col-span-1 col-span-2">
          <CategoriesComponent />
        </div>
        <div className='md:col-span-3 col-span-3'>
          <ProductsComponent/>
        </div>
      </div>
    </LayoutMain>
  )
}

export default products
