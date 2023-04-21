import {NextResponse} from 'next/server'

import {assertString} from '@/lib/assert'
import {deleteUserConnection} from '@/server/db/user-connections/setters'
import {withAuth} from '@/server/helpers/auth'

export const DELETE = withAuth(
  async (
    req: Request,
    {userId, params}: {userId: string; params: {connectionId: string}},
  ) => {
    const {connectionId} = params

    assertString(userId, 'Invalid user')
    assertString(connectionId, 'Invalid connection id')

    await deleteUserConnection({userId, connectionId})

    return NextResponse.json({success: true})
  },
)
