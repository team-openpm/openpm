import {NextResponse} from 'next/server'

import {getPackagesByIds} from '@/server/db/packages/getters'
import {getConnectionsForUser} from '@/server/db/user-connections/getters'
import {withAuth} from '@/server/helpers/auth'

// Retrive a list of connected packages for the current user

export const GET = withAuth(async (req: Request, {userId}) => {
  const connections = await getConnectionsForUser(userId)

  if (!connections.length) {
    return NextResponse.json([])
  }

  const packageIds = connections.map((conn) => conn.package_id)

  const packages = await getPackagesByIds(packageIds)

  return NextResponse.json(packages)
})
