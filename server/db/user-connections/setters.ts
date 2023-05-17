import {assertString} from '@/lib/assert'

import {db} from '../db'

export function createUserConnection({
  userId,
  packageId,
  apiKey,
  accessToken,
  refreshToken,
  expiresAt,
}: {
  userId: string
  packageId: string
  apiKey?: string | null
  accessToken?: string | null
  refreshToken?: string | null
  expiresAt?: Date | null
}) {
  assertString(apiKey || accessToken, 'apiKey or accessToken is required')

  return db
    .insertInto('user_connections')
    .values({
      user_id: userId,
      package_id: packageId,
      api_key: apiKey,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    })
    .returning('id')
    .executeTakeFirstOrThrow()
}

export function updateUserConnection({
  userId,
  packageId,
  apiKey,
  accessToken,
  refreshToken,
  expiresAt,
}: {
  userId: string
  packageId: string
  apiKey: string | null
  accessToken: string | null
  refreshToken: string | null
  expiresAt: Date | null
}) {
  return db
    .updateTable('user_connections')
    .set({
      api_key: apiKey,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    })
    .where('user_id', '=', userId)
    .where('package_id', '=', packageId)
    .execute()
}

export function deleteUserConnection({
  userId,
  connectionId,
}: {
  userId: string
  connectionId: string
}) {
  return db
    .deleteFrom('user_connections')
    .where('id', '=', connectionId)
    .where('user_id', '=', userId)
    .execute()
}
