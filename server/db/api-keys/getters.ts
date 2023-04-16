import {assertString} from '@/lib/assert'

import {RedactedApiKey} from './types'
import {db} from '../connection'

export async function getUserIdFromApiKey({
  apiKey,
}: {
  apiKey: string
}): Promise<null | string> {
  assertString(apiKey, 'apikey cannot be blank')

  const result = await db
    .selectFrom('api_keys')
    .select('user_id')
    .where('key', '=', apiKey)
    .executeTakeFirst()

  if (result) {
    return result.user_id
  }

  return null
}

export async function getApiKey({userId, apiKeyId}: {userId: string; apiKeyId: string}) {
  const apiKeyRow = await db
    .selectFrom('api_keys')
    .selectAll()
    .where('id', '=', apiKeyId)
    .where('user_id', '=', userId)
    .executeTakeFirstOrThrow()

  return {
    id: apiKeyRow.id,
    keyExcerpt: extractExcerpt(apiKeyRow.key),
    createdAt: apiKeyRow.created_at,
    revokedAt: apiKeyRow.revoked_at,
  }
}

export async function getApiKeys({userId}: {userId: string}): Promise<RedactedApiKey[]> {
  const apiKeyRows = await db
    .selectFrom('api_keys')
    .selectAll()
    .where('user_id', '=', userId)
    .orderBy('created_at', 'desc')
    .execute()

  return apiKeyRows.map((row) => {
    return {
      id: row.id,
      keyExcerpt: extractExcerpt(row.key),
      createdAt: row.created_at,
      revokedAt: row.revoked_at,
    }
  })
}

export async function getUnrevokedApiKeys({
  userId,
}: {
  userId: string
}): Promise<RedactedApiKey[]> {
  const apiKeys = await getApiKeys({userId})
  return apiKeys.filter((apiKey) => !apiKey.revokedAt)
}

const extractExcerpt = (key: string) => key.slice(-5)
