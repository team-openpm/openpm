import {MainTemplate} from '@/components/main-template'
import {SearchInput} from '@/components/search-input'
import {
  getPackagesWithPagination,
  searchPackagesWithPagination,
} from '@/server/db/packages/getters'

import {PackageItem} from './package-item'
import {Pagination} from './pagination'

export default async function Packages({
  searchParams: {q: query = '', p = 1},
}: {
  searchParams: {q: string, p: number}
}) {
  const limit = 50
  const page = Number(p)

  const {packages, total} = query
    ? await searchPackagesWithPagination({query, limit, page})
    : await getPackagesWithPagination({limit, page})

  const shouldPaginate = total > limit

  return (
    <MainTemplate>
      <div className="relative mt-10 flex place-items-center">
        <SearchInput className="h-11 w-full min-w-[400px] appearance-none rounded-full border border-pink-500/30 bg-white px-12 text-center text-sm text-zinc-900 shadow-sm outline-none transition-all duration-300 placeholder:text-pink-400 hover:ring-zinc-900/20 focus:border-pink-300 focus:ring focus:ring-pink-200/50 dark:bg-white/5 dark:text-zinc-400 dark:ring-white/10 dark:hover:ring-white/20 " />

        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-2">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="h-7 w-7 stroke-current text-pink-400/50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
            ></path>
          </svg>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-5">
          <kbd className="ml-auto text-sm text-pink-400 dark:text-zinc-500">
            <kbd className="font-sans">⌘</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        </div>
      </div>

      <ul className="mt-10 space-y-2">
        {packages.map((pkg) => (
          <PackageItem key={pkg.id} pkg={pkg} />
        ))}
      </ul>

      {shouldPaginate && <Pagination total={total} page={page} limit={limit} query={query} />}

      {packages.length === 0 && (
        <div className="mt-10 text-center">
          <h4 className="text-base font-medium">No APIs found</h4>
        </div>
      )}
    </MainTemplate>
  )
}
