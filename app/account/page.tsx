import dynamic from 'next/dynamic'

import {AccountHeader} from '@/components/account-header'
import {authOrRedirect} from '@/server/helpers/auth'

import {AccountSidebar} from './account-sidebar'
import {ApiKeys} from './api-keys'
import {Connections} from './connections'
import {Packages} from './packages'
import {Section} from './section'

const AccountProfile = dynamic(() => import('@/components/account-profile'), {
  ssr: false,
})

export default async function AccountPage() {
  const userId = await authOrRedirect()

  return (
    <div className="flex min-h-screen">
      <div className="flex-none border-r border-slate-900/10 dark:border-white/10">
        <AccountSidebar />
      </div>

      <div className="flex-grow">
        <AccountHeader />

        <div className="space-y-12 px-20 py-16">
          <h1 className="text-xl font-medium">Account</h1>

          <div className="space-y-12">
            <div className="-mt-6" id="auth">
              <AccountProfile />
            </div>

            <Section title="API Keys">
              <ApiKeys userId={userId} />
            </Section>

            <Section title="Connections">
              <Connections userId={userId} />
            </Section>

            <Section title="Packages">
              <Packages userId={userId} />
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}
