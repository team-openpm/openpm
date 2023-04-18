'use client'

import {Transition} from '@headlessui/react'
import {useCallback, useEffect, useState} from 'react'

import {MainTemplate} from '@/components/main-template'

import {PackageItem} from './package-item'
import {Pagination} from './pagination'
import {SearchInput} from './search-input'
import {PackageResponse, PaginatedResponse} from './types'

export default function Packages() {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<PackageResponse[]>([])
  const [hasRequested, setHasRequested] = useState(false)
  const limit = 50

  const shouldPaginate = total > limit

  const onResults = (results: PaginatedResponse) => {
    setHasRequested(true)
    setResults(results.items)
    setTotal(results.total)
  }

  const withLoading = useCallback(async (fn: () => Promise<void>) => {
    setLoading(true)
    await fn()
    setLoading(false)
  }, [])

  useEffect(() => {
    const uri = new URL(window.location.href)
    const search = uri.searchParams.get('q')

    if (search) {
      setQuery(search)
    }
  }, [])

  useEffect(() => {
    if (query) {
      withLoading(() => searchPackages({query, page, limit}).then(onResults))
      setUrlSearchParams({
        q: query,
        page: page.toString(),
      })
    } else {
      withLoading(() => fetchPackages({page, limit}).then(onResults))
    }
  }, [query, page, limit, withLoading])

  return (
    <MainTemplate>
      <div className="relative mt-10 flex place-items-center">
        <SearchInput value={query} onChange={setQuery} />

        <Transition
          show={!loading}
          enter="transition-opacity duration-75 delay-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300 delay-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
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
        </Transition>

        <Transition
          show={loading}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-3">
            <svg
              className="h-6 w-6 animate-spin text-pink-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </Transition>

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

      {hasRequested && query && results.length === 0 && (
        <div className="mt-14 text-center">
          <h4 className="text-base font-medium opacity-60">No APIs found :(</h4>
        </div>
      )}
    </MainTemplate>
  )
}

async function searchPackages({
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

async function fetchPackages({page, limit}: {page: number; limit: number}) {
  const uri = new URL('/api/packages', window.location.origin)
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

const setUrlSearchParams = (searchParams: Record<string, string>) => {
  // push state to the url
  const uri = new URL(window.location.href)

  for (const [key, value] of Object.entries(searchParams)) {
    uri.searchParams.set(key, value)
  }

  window.history.replaceState({}, '', uri.toString())
}
