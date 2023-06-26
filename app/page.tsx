import {ArrowRightIcon} from '@heroicons/react/20/solid'
import Link from 'next/link'

import {MainTemplate} from '@/components/main-template'
import {SearchInput} from '@/components/search-input'

export default function Home() {
  return (
    <MainTemplate>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-lg font-medium text-slate-900/90 dark:text-white/90">
          OpenAPI package manager
        </h1>

        <h2 className="mt-2 text-lg text-slate-900/90 dark:text-white/90">
          For AI plugins
        </h2>

        <div className="relative mt-10 flex place-items-center">
          <SearchInput className="h-12 w-full appearance-none rounded-full border border-pink-500/20 bg-white px-12 text-center text-base text-slate-900 shadow-sm outline-none transition-all duration-300 placeholder:text-pink-400 hover:ring-slate-900/20 focus:border-pink-300 focus:ring focus:ring-pink-200/50 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10 dark:hover:ring-white/20 sm:min-w-[320px] " />

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center px-2">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="h-8 w-8 stroke-current text-pink-400/50"
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
      </div>

      <div className="relative mt-10 grid divide-y divide-slate-900/5 overflow-hidden rounded-2xl border border-slate-900/5 bg-white/10 text-left backdrop-blur-md sm:mb-32 lg:mb-0 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        <Link
          href="/docs"
          className="group px-6 py-4 transition-colors  hover:bg-slate-900/1 hover:dark:bg-white/5"
        >
          <h2 className={`mb-2 flex items-center gap-2 text-base font-medium`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </h2>

          <p className={`m-0 text-sm opacity-80`}>
            Explore how to integrate your APIs and AI.
          </p>
        </Link>

        <Link
          prefetch={false}
          href="/new"
          className="group px-6 py-4 transition-colors  hover:bg-slate-900/1 hover:dark:bg-white/5"
        >
          <h2 className={`mb-2 flex items-center gap-2 text-base font-medium`}>
            Publish{' '}
            <span className="inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </h2>
          <p className={`m-0 text-sm opacity-80`}>
            Submit your AI plugin to the registry.
          </p>
        </Link>

        <Link
          prefetch={false}
          href="/apis/openpm"
          className="group px-6 py-4 transition-colors  hover:bg-slate-900/1 hover:dark:bg-white/5"
        >
          <h2 className={`mb-2 flex items-center gap-2 text-base font-medium`}>
            Build{' '}
            <span className="inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </h2>

          <p className={`m-0 text-sm opacity-80`}>
            Use our API to search for AI plugins.
          </p>
        </Link>
      </div>
    </MainTemplate>
  )
}
