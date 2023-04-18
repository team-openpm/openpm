'use client'

import {useEffect, useState} from 'react'

import {MainTemplate} from '@/components/main-template'

import {PackageItem} from './package-item'
import {Pagination} from './pagination'
import {SearchInput} from './search-input'
import {PackageResponse, PaginatedResponse} from './types'

export default function Packages() {
  const [query, setQuery] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<PackageResponse[]>([])
  const [hasRequested, setHasRequested] = useState(false)
  const limit = 50

  const shouldPaginate = total > limit

  const onSearchResults = (results: PaginatedResponse) => {
    setHasRequested(true)
    setResults(results.items)
    setTotal(results.total)
  }

  useEffect(() => {
    const uri = new URL(window.location.href)
    const search = uri.searchParams.get('q')

    if (search) {
      setQuery(search)
    }
  }, [])

  useEffect(() => {
    if (query) {
      performSearch({query, page, limit}).then(onSearchResults)
    } else {
      setResults([])
    }
  }, [query, page, limit])

  return (
    <MainTemplate>
      <div className="relative mt-10 flex place-items-center">
        <SearchInput value={query} onChange={setQuery} />

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
          <kbd className="ml-auto text-sm text-pink-400 dark:text-slate-500">
            <kbd className="font-sans">⌘</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        </div>
      </div>

      {results.length > 0 && (
        <ul className="mt-10 space-y-2">
          {results.map((pkg) => (
            <PackageItem key={pkg.id} pkg={pkg} />
          ))}
        </ul>
      )}

      {hasRequested && shouldPaginate && (
        <Pagination
          onChange={(page) => setPage(page)}
          total={total}
          page={page}
          limit={limit}
        />
      )}

      {hasRequested && results.length === 0 && (
        <div className="mt-10 text-center">
          <h4 className="text-base font-medium opacity-60">No APIs found :(</h4>
        </div>
      )}
    </MainTemplate>
  )
}

async function performSearch({
  query,
  page,
  limit,
}: {
  query: string
  page: number
  limit: number
}) {
  const uri = new URL('/api/packages/search', window.location.origin)
  uri.searchParams.set('query', query)
  uri.searchParams.set('page', page.toString())
  uri.searchParams.set('limit', limit.toString())

  const request = await fetch(uri)

  if (request.ok) {
    const results: PaginatedResponse = await request.json()
    return results
  } else {
    return {
      items: [],
      total: 0,
    }
  }
}
