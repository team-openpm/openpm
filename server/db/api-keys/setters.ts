import {generateApiKey} from '@/lib/generate-id'

import {db} from '../db'

export const createApiKey = async ({userId}: {userId: string}) => {
  const key = generateApiKey()

  const {id} = await db
    .insertInto('api_keys')
    .values({
      key,
      user_id: userId,
    })
    .returning('id')
    .executeTakeFirstOrThrow()

  return {
    id,
    key,
  }
}

export const revokeApiKey = async ({
  userId,
  apiKeyId,
}: {
  userId: string
  apiKeyId: string
}) => {
  await db
    .updateTable('api_keys')
    .set({
      revoked_at: new Date(),
    })
    .where('id', '=', apiKeyId)
    .where('user_id', '=', userId)
    .executeTakeFirstOrThrow()
}
