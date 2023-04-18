'use client'

import {Menu} from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import {useEffect, useState} from 'react'

interface User {
  id: string
  email: string
}

export function AccountHeaderMenuItems() {
  const [user, setUser] = useState<User | null | undefined>()

  const fetchUser = async () => {
    const request = await fetch('/api/whoami', {
      next: {
        revalidate: 60,
      },
    })

    if (request.ok) {
      const user = await request.json()
      setUser(user)
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    if (typeof user !== 'undefined') {
      return
    }

    fetchUser()
  }, [user])

  return (
    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-white/5 dark:bg-slate-800">
      {user?.id && (
        <div className="px-4 py-3">
          <p className="text-sm">Signed in as</p>
          <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
            {user.email ?? 'unknown'}
          </p>
        </div>
      )}
      <div className="py-1">
        <Menu.Item>
          {({active}) => (
            <Link
              prefetch={false}
              href="/account"
              className={clsx(
                active
                  ? 'bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white'
                  : 'text-slate-700 dark:text-white',
                'block px-4 py-2 text-sm',
              )}
            >
              Account settings
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({active}) => (
            <a
              href="mailto:support@openpm.ai"
              className={clsx(
                active
                  ? 'bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white'
                  : 'text-slate-700 dark:text-white',
                'block px-4 py-2 text-sm',
              )}
            >
              Support
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({active}) => (
            <Link
              prefetch={false}
              href="/about"
              className={clsx(
                active
                  ? 'bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white'
                  : 'text-slate-700 dark:text-white',
                'block px-4 py-2 text-sm',
              )}
            >
              About
            </Link>
          )}
        </Menu.Item>
      </div>
      <div className="py-1">
        {user?.id ? (
          <Menu.Item>
            {({active}) => (
              <Link
                href="/sign-out"
                prefetch={false}
                className={clsx(
                  active
                    ? 'bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white'
                    : 'text-slate-700 dark:text-white',
                  'block w-full px-4 py-2 text-left text-sm',
                )}
              >
                Sign out
              </Link>
            )}
          </Menu.Item>
        ) : (
          <Menu.Item>
            {({active}) => (
              <Link
                href="/auth"
                prefetch={false}
                className={clsx(
                  active
                    ? 'bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white'
                    : 'text-gray-700',
                  'block w-full px-4 py-2 text-left text-sm',
                )}
              >
                Sign in
              </Link>
            )}
          </Menu.Item>
        )}
      </div>
    </Menu.Items>
  )
}
