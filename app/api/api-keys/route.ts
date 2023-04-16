import {NextResponse} from 'next/server'

import {assertString} from '@/lib/assert'
import {createApiKey} from '@/server/db/api-keys/setters'
import {withAuth} from '@/server/helpers/auth'

export const POST = withAuth(async (req: Request, {userId}: {userId: string}) => {
  assertString(userId, 'Invalid user')

  const {id, key} = await createApiKey({userId})

  return NextResponse.json({
    id,
    key,
  })
})
