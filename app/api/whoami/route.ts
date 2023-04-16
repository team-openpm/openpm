import {NextResponse} from 'next/server'

import {assertString} from '@/lib/assert'
import {withAuth} from '@/server/helpers/auth'

export const GET = withAuth(async (req: Request, {userId}: {userId: string}) => {
  assertString(userId, 'Invalid user')

  return NextResponse.json({
    userId,
  })
})
