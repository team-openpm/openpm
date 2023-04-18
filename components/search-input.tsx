'use client'

import {useEffect, useRef, useState} from 'react'

export function SearchInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLInputElement | null>(null)

  // Add a cmd+k hotkey to focus the search input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'k') {
        event.preventDefault()
        ref.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  useEffect(() => {
    const uri = new URL(window.location.href)
    const search = uri.searchParams.get('q')

    if (search) {
      setValue(search)
    }
  }, [])

  return (
    <form action="/packages" className="contents">
      <input
        ref={ref}
        name="q"
        type="search"
        placeholder="Search for an API..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        {...props}
      />
    </form>
  )
}
