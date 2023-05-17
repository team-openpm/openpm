'use server'

import {redirect} from 'next/navigation'

import {setUser} from '@/server/db/users/setters'
import {getSessionEmails, authOrRedirect} from '@/server/helpers/auth'

export default async function CompletePage({
  searchParams,
}: {
  searchParams: {redirect?: string}
}) {
  const userId = await authOrRedirect()
  const emails = (await getSessionEmails()) ?? []

  await setUser({
    id: userId,
    signInDate: new Date(),
    emails,
  })

  // If redirect is a relative path
  if (searchParams.redirect?.startsWith('/')) {
    return redirect(searchParams.redirect)
  }

  redirect('/account')
}
