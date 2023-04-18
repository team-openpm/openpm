import first from 'lodash/first'
import {NextResponse} from 'next/server'

import {assertString} from '@/lib/assert'
import {getUserById} from '@/server/db/users/getters'
import {withAuth} from '@/server/helpers/auth'

export const GET = withAuth(async (req: Request, {userId}: {userId: string}) => {
  assertString(userId, 'Invalid user')

  const user = await getUserById(userId)

  return NextResponse.json({
    id: userId,
    email: first(user?.emails) ?? null,
  })
})
