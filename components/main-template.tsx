/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

import AccountHeaderMenu from './account-header/menu'
import {ThemeToggle} from './account-header/theme-toggle'
import {LogoGithub} from './icons/logo-github'

type Props = {
  children?: React.ReactNode
}

export const MainTemplate: React.FC<Props> = ({children}) => {
  return (
    <main className="flex flex-col scroll-smooth bg-slate-50 dark:bg-slate-900">
      <img
        src="/background-gradient.jpg"
        className="pointer-events-none fixed left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%] dark:hidden"
        width={1558}
        height={946}
        alt=""
      />

      <div className="fixed inset-x-0 z-20 flex items-center justify-center border-b border-slate-900/5 bg-white/10 px-5 py-2 text-slate-900 backdrop-blur-sm dark:text-white/80">
        <div className="grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2">
          <div className="flex items-center space-x-10">
            <Link prefetch={false} className=" font-mono  text-pink-500" href="/">
              openpm.ai
            </Link>

            <Link prefetch={false} href="/docs">
              docs
            </Link>

            <Link prefetch={false} href="/apis">
              apis
            </Link>

            <Link prefetch={false} href="/about">
              about
            </Link>

            <a
              className="flex items-center space-x-2"
              href="https://github.com/team-openpm/openpm"
            >
              <LogoGithub className="h-5 w-5" />
              <span>openpm</span>
            </a>
          </div>

          <div className="hidden items-center justify-end gap-10 sm:flex">
            <Link href="/new" className="text-sm font-medium">
              submit api...
            </Link>

            <AccountHeaderMenu />
          </div>

          <div className="absolute bottom-0 right-3 top-0 hidden items-center sm:flex">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="z-10 flex min-h-screen flex-col items-center px-5 pt-16 sm:p-24 lg:p-36">
        <div className="flex w-full max-w-prose flex-1 flex-col">{children}</div>

        <footer className="z-10 mt-5 flex items-center justify-center gap-5 py-5 sm:mt-10 lg:mt-28">
          <Link
            prefetch={false}
            href="/about"
            className="text-sm text-pink-900/20 hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
          >
            about
          </Link>

          <Link
            prefetch={false}
            href="/terms"
            className="text-sm text-pink-900/20 hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
          >
            terms
          </Link>

          <Link
            prefetch={false}
            href="/privacy"
            className="text-sm text-pink-900/20 hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
          >
            privacy
          </Link>

          <Link
            prefetch={false}
            href="https://github.com/team-openpm/openpm"
            className="text-sm text-pink-900/20 hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
          >
            github
          </Link>
        </footer>
      </div>
    </main>
  )
}
