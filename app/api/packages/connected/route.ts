import {NextResponse} from 'next/server'

import {buildPackageResponse} from '@/helpers/api/package-response'
import {getFullPackagesByIds} from '@/server/db/packages/getters'
import {getConnectionsForUser} from '@/server/db/user-connections/getters'
import {withAuth} from '@/server/helpers/auth'

// Retrive a list of connected packages for the current user

export const GET = withAuth(async (request: Request, {userId}) => {
  const {searchParams} = new URL(request.url)
  const proxy = searchParams.get('proxy') === 'true'
  const connections = await getConnectionsForUser(userId)

  if (!connections.length) {
    return NextResponse.json([])
  }

  const packageIds = connections.map((conn) => conn.package_id)

  const packages = await getFullPackagesByIds(packageIds)

  const responses = await Promise.all(
    packages.map((pkg) => buildPackageResponse(pkg, {proxy})),
  )

  return NextResponse.json(responses)
})
