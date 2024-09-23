import { Link, router } from '@inertiajs/react'
import _ from 'lodash'

type PaginationProps = {
  previousPageUrl: string | null
  nextPageUrl: string | null
  currentPage: number
  lastPage: number
  url: string
  query?: string
}

function PaginationComponent({
  previousPageUrl,
  nextPageUrl,
  currentPage,
  lastPage,
  url,
  query,
}: PaginationProps) {
  const items = []

  for (let i = 1; i <= lastPage; i++) {
    items.push(
      <li key={i}>
        {_.isEmpty(query) ? (
          <Link
            href={'?page=' + i}
            aria-current="page"
            className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            {i}
          </Link>
        ) : (
          <button
          onClick={() =>
            router.get(url, {
              search: query,
              page: i,
            })
          }
            aria-current="page"
            className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            {i}
          </button>
        )}
      </li>
    )
  }
  return (
    <div className="flex justify-center items-center mt-4">
      {currentPage > 1 ? (
        <>
          {_.isEmpty(query) ? (
            <Link href={`${url}${previousPageUrl}`}>
              <button className="px-4 py-2 bg-gray-200">Previous</button>
            </Link>
          ) : (
            <button
              onClick={() =>
                router.get(url, {
                  search: query,
                  page: currentPage - 1,
                })
              }
              className="px-4 py-2 bg-gray-200"
            >
              Previous
            </button>
          )}
        </>
      ) : (
        <button className="px-4 py-2 bg-gray-200" disabled>
          Previous
        </button>
      )}

      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm"> {items}</ul>
      </nav>

      {currentPage < lastPage ? (
        <>
          {_.isEmpty(query) ? (
            <Link href={`${url}${nextPageUrl}`}>
              <button className="px-4 py-2 bg-gray-200">Next</button>
            </Link>
          ) : (
            <button
              onClick={() => router.get(url, { search: query, page: currentPage + 1 })}
              className="px-4 py-2 bg-gray-200"
            >
              Next
            </button>
          )}
        </>
      ) : (
        <button className="px-4 py-2 bg-gray-200">Next</button>
      )}
    </div>
  )
}

export default PaginationComponent
