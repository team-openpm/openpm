import {db} from '../db'

export function createConnection({
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
    .insertInto('user_connections')
    .values({
      user_id: userId,
      package_id: packageId,
      api_key: apiKey,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    })
    .execute()
}

export function updateConnection({
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
