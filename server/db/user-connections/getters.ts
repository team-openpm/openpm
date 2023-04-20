import {db} from '../db'

export function getConnectionsForUser(userId: string) {
  return db
    .selectFrom('user_connections')
    .selectAll()
    .where('user_id', '=', userId)
    .execute()
}

export function getConnectionForPackageAndUser({
  userId,
  packageId,
}: {
  userId: string
  packageId: string
}) {
  // Select first connection
  return db
    .selectFrom('user_connections')
    .selectAll()
    .where('user_id', '=', userId)
    .where('package_id', '=', packageId)
    .executeTakeFirst()
}
