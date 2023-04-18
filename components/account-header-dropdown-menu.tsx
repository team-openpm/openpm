'use client'

import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Link from 'next/link'
import {Fragment} from 'react'

export default function AccountHeaderDropdownMenu({
  userId,
  userEmail,
}: {
  userId: string | null
  userEmail: string | null
}) {
  return (
    <Menu as="div" className="relative inline-block w-[110px] text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-4 py-1 text-sm font-medium">
          account
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-slate-900 dark:text-white/90"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-white/5 dark:bg-slate-800">
          {userId && (
            <div className="px-4 py-3">
              <p className="text-sm">Signed in as</p>
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {userEmail ?? 'unknown'}
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
            {userId ? (
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
      </Transition>
    </Menu>
  )
}
