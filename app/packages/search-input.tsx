'use client'

import {Transition} from '@headlessui/react'
import {useRef} from 'react'

import {useKeyboardShortcut} from '@/lib/use-keyboard-shortcut'

export function SearchInput({
  value,
  onChange,
  loading,
}: {
  value: string
  onChange: (value: string) => void
  loading: boolean
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
    <div className="relative">
      <input
        ref={ref}
        name="q"
        type="search"
        placeholder="Search for an API..."
        className="h-11 w-full appearance-none rounded-full border border-pink-500/30 bg-white px-12 text-center text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 placeholder:text-pink-400 hover:ring-slate-900/20 focus:border-pink-300 focus:ring focus:ring-pink-200/50 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10 dark:hover:ring-white/20 "
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-2">
        <Transition
          show={!loading}
          enter="transition-opacity duration-500 delay-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-100 delay-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Magnifying glass */}
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
        </Transition>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-3">
        <Transition
          show={loading}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Spinner */}
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
        </Transition>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-5">
        <kbd className="ml-auto text-sm text-pink-400 dark:text-slate-500">
          <kbd className="font-sans">⌘</kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      </div>
    </div>
  )
}
