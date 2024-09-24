import { Link } from '@inertiajs/react'
import Products from '~/components/admin/Products'
import LayoutAdmin from '~/layouts/LayoutAdmin'

export default function products() {
  return (
    <LayoutAdmin>
       <div className="text-end">
        <Link
          href="/admin/product/create"
          className="bg-blue-500 px-3 py-2 rounded-md text-white"
        >
          Create
        </Link>
      </div>
      <Products />
    </LayoutAdmin>
  )
}
