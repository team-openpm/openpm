import {Suspense} from 'react'

import {AcccountHeaderDropdown} from './account-header-dropdown'

export function AccountHeaderDropdownSuspense() {
  return (
    <Suspense fallback={<div className="h-[32px] w-[110px]" />}>
      {/* @ts-expect-error Async Server Component */}
      <AcccountHeaderDropdown />
    </Suspense>
  )
}
