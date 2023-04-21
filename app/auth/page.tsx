import dynamic from 'next/dynamic'

import {MainTemplate} from '@/components/main-template'

const AccountAuth = dynamic(() => import('@/components/account-auth'), {
  ssr: false,
})

export default function AccountPage({searchParams}: {searchParams: {redirect?: string}}) {
  return (
    <MainTemplate>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <AccountAuth redirect={searchParams.redirect} />
        </div>
      </div>
    </MainTemplate>
  )
}
