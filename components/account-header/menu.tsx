'use client'

import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {Fragment, Suspense} from 'react'

import {AccountHeaderMenuItems} from './menu-items'

export default function AccountHeaderMenu() {
  return (
    <Menu as="div" className="relative inline-block w-[110px] text-left">
      {({open}) => (
        <>
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
            <div>
              <Suspense fallback={null}>
                {open ? <AccountHeaderMenuItems /> : null}
              </Suspense>
            </div>
          </Transition>
        </>
      )}
    </Menu>
  )
}
