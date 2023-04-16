import {NextResponse} from 'next/server'

import {assertString} from '@/lib/assert'
import {getApiKey} from '@/server/db/api-keys/getters'
import {revokeApiKey} from '@/server/db/api-keys/setters'
import {withAuth} from '@/server/helpers/auth'

export const POST = withAuth(
  async (
    req: Request,
    {userId, params}: {userId: string; params: {apiKeyId: string}},
  ) => {
    const {apiKeyId} = params

    assertString(userId, 'Invalid user')
    assertString(apiKeyId, 'Invalid API key ID')

    await revokeApiKey({userId, apiKeyId})

    const apiKey = await getApiKey({userId, apiKeyId})

    if (req.headers.get('Accept') === 'application/json') {
      return NextResponse.json({
        id: apiKey.id,
        createdAt: apiKey.createdAt,
        revokedAt: apiKey.revokedAt,
      })
    } else {
      return NextResponse.redirect(new URL(`/account`, req.url))
    }
  },
)
