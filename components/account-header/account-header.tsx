import Link from 'next/link'

import AccountHeaderMenu from './menu'
import {ThemeToggle} from './theme-toggle'
import {SearchInput} from '../search-input'

export const AccountHeader = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center border-b border-slate-900/10 bg-white/80 px-10 py-0 backdrop-blur-md dark:border-white/7.5 dark:bg-transparent">
      <div className="flex flex-1 items-center space-x-2 py-3 pl-10 text-sm text-slate-600">
        <div className="relative flex w-full max-w-lg place-items-center">
          <SearchInput className="h-8 w-full appearance-none rounded-full border border-pink-500/30 bg-white px-9 text-xs text-slate-900 shadow-sm outline-none transition-all duration-300 placeholder:text-pink-400 hover:ring-slate-900/20 focus:border-pink-300 focus:ring focus:ring-pink-200/50 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10  dark:hover:ring-white/20" />

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-2">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="h-6 w-6 stroke-current text-pink-400/50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
              ></path>
            </svg>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-5">
            <kbd className="ml-auto text-xs text-pink-400/50 dark:text-slate-500">
              <kbd className="font-sans">⌘</kbd>
              <kbd className="font-sans">K</kbd>
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex flex-none items-center space-x-6">
        <Link prefetch={false} href="/new" className="text-sm font-medium">
          submit api...
        </Link>

        <AccountHeaderMenu />

        <ThemeToggle />
      </div>
    </header>
  )
}
