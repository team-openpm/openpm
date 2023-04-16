'use server'

import {getSessionInfo} from '@/server/helpers/auth'

import AccountHeaderDropdownMenu from './account-header-dropdown-menu'

export async function AcccountHeaderDropdown() {
  const {userId, userEmail} = (await getSessionInfo()) ?? {
    userId: null,
    userEmail: null,
  }

  return <AccountHeaderDropdownMenu userId={userId} userEmail={userEmail} />
}
