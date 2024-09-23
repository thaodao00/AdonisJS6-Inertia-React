import { Link } from '@inertiajs/react'

type PaginationProps = {
  previousPageUrl: string | null
  nextPageUrl: string | null
  currentPage: number
  lastPage: number
}

function PaginationComponent({
  previousPageUrl,
  nextPageUrl,
  currentPage,
  lastPage,
}: PaginationProps) {
  const items = []

  for (let i = 1; i <= lastPage; i++) {
    items.push(
      <li>
        <Link
          href={'?page=' + i}
          aria-current="page"
          className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        >
          {i}
        </Link>
      </li>
    )
  }
  return (
    <div className="flex justify-center items-center mt-4">
      {currentPage > 1 ? (
        <Link href={`/admin/categories${previousPageUrl}`}>
          <button className="px-4 py-2 bg-gray-200">Previous</button>
        </Link>
      ) : (
        <button className="px-4 py-2 bg-gray-200" disabled>
          Previous
        </button>
      )}

      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm"> {items}</ul>
      </nav>

      {currentPage < lastPage ? (
        <Link href={`/admin/categories${nextPageUrl}`}>
          <button className="px-4 py-2 bg-gray-200">Next</button>
        </Link>
      ) : (
        <button className="px-4 py-2 bg-gray-200">Next</button>
      )}
    </div>
  )
}

export default PaginationComponent
