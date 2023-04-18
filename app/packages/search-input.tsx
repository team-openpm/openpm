'use client'

import {useRef} from 'react'

import {useKeyboardShortcut} from '@/lib/use-keyboard-shortcut'

export function SearchInput({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const ref = useRef<HTMLInputElement | null>(null)

  // Add a cmd+k hotkey to focus the search input
  useKeyboardShortcut(
    'k',
    () => {
      ref.current?.focus()
    },
    {metaKey: true},
  )

  return (
    <input
      ref={ref}
      name="q"
      type="search"
      placeholder="Search for an API..."
      className="h-11 w-full min-w-[400px] appearance-none rounded-full border border-pink-500/30 bg-white px-12 text-center text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 placeholder:text-pink-400 hover:ring-slate-900/20 focus:border-pink-300 focus:ring focus:ring-pink-200/50 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10 dark:hover:ring-white/20 "
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
