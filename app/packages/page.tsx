'use client'

import {useCallback, useEffect, useRef, useState} from 'react'

import {MainTemplate} from '@/components/main-template'
import {useDebouncedState} from '@/lib/use-debounced-state'

import {Header} from './header'
import {PackageItem} from './package-item'
import {Pagination} from './pagination'
import {SearchInput} from './search-input'
import {PackageResponse, PaginatedResponse} from './types'

export default function Packages() {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useDebouncedState(query, 100)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<PackageResponse[]>([])
  const [hasRequested, setHasRequested] = useState(false)
  const limit = 50
  const shouldPaginate = total > limit
  const requestCounter = useRef(0)

  const onResults = (results: PaginatedResponse) => {
    setHasRequested(true)
    setResults(results.items)
    setTotal(results.total)
  }

  const withDuplicatedRequests = useCallback(async function (
    fn: () => Promise<PaginatedResponse>,
  ) {
    const currentRequest = ++requestCounter.current

    setLoading(true)
    const result = await fn()

    if (currentRequest !== requestCounter.current) {
      // There is a newer request, ignore this one
      return
    }

    onResults(result)
    setLoading(false)
  },
  [])

  useEffect(() => {
    const uri = new URL(window.location.href)
    const search = uri.searchParams.get('q')

    if (typeof search === 'string') {
      setQuery(search)
    }
  }, [])

  useEffect(() => {
    setDebouncedQuery(query)
  }, [query, setDebouncedQuery])

  useEffect(() => {
    if (debouncedQuery) {
      withDuplicatedRequests(() => {
        return searchPackages({query: debouncedQuery, page, limit})
      })

      setUrlSearchParams({
        q: debouncedQuery,
        page: page.toString(),
      })
    } else {
      withDuplicatedRequests(() => fetchPackages({page, limit}))
    }
  }, [debouncedQuery, page, limit, withDuplicatedRequests])

  return (
    <MainTemplate>
      <Header>
        <SearchInput value={query} onChange={setQuery} loading={loading} />
      </Header>

      {results.length > 0 && (
        <ul className="mt-5 space-y-2 sm:mt-10">
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
  const uri = new URL('/api/packages/paginated-search', window.location.origin)
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
