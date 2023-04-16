'use server'

import {redirect} from 'next/navigation'

import {setUser} from '@/server/db/users/setters'
import {getSessionEmails, authOrRedirect} from '@/server/helpers/auth'

export default async function CompletePage() {
  const userId = await authOrRedirect()
  const emails = (await getSessionEmails()) ?? []

  await setUser({
    id: userId,
    signInDate: new Date(),
    emails,
  })

  redirect('/account')
}
