import Link from 'next/link'
import React from 'react'

export function AccountSidebar() {
  return (
    <aside className="sticky top-0 w-72 px-6 py-4">
      <div className="space-y-1">
        <h3 className="flex justify-between font-mono">
          <Link className="text-pink-500 " href="/">
            openpm.ai
          </Link>
        </h3>
      </div>

      <div className="space-y-8 pt-24">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
            Account
          </h3>

          <ul role="list" className="border-l border-slate-900/10 dark:border-white/5">
            <li className="relative">
              <MenuItem href="#auth">Emails</MenuItem>
              <MenuItem href="#auth">Passkeys</MenuItem>
              <MenuItem href="#packages">Packages</MenuItem>
              <MenuItem href="#api-keys">API Keys</MenuItem>
              <MenuItem href="#connections">Connections</MenuItem>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

const MenuItem = ({children, href}: {children: React.ReactNode; href: string}) => (
  <a
    className="
      relative flex justify-between gap-2 py-1 pl-4 
      pr-3 text-sm text-slate-600 transition
      before:absolute before:inset-0 before:inset-x-1 before:rounded-md before:bg-slate-800/2.5 before:opacity-0 hover:text-slate-900 hover:before:opacity-100
      dark:text-slate-400 before:dark:bg-white/2.5 dark:hover:text-white"
    href={href}
  >
    <span className="relative truncate">{children}</span>
  </a>
)
