import dynamic from 'next/dynamic'

import {MainTemplate} from '@/components/main-template'

const AccountAuth = dynamic(() => import('@/components/account-auth'), {
  ssr: false,
})

export default function AccountPage({searchParams}: {searchParams: {redirect?: string}}) {
  return (
    <MainTemplate>
      <AccountAuth redirect={searchParams.redirect} />
    </MainTemplate>
  )
}
