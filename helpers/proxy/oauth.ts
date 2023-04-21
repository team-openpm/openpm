// OAuth Helpers

import {generateId} from '@/lib/generate-id'
import {jsonFetch} from '@/lib/json-fetch'

export function buildOAuthAuthorizeUrl({
  authorizeUrl,
  redirectUrl,
  clientId,
}: {
  authorizeUrl: string
  redirectUrl: string
  clientId: string
}) {
  const url = new URL(authorizeUrl)

  url.searchParams.set('client_id', clientId)
  url.searchParams.set('state', generateId())
  url.searchParams.set('redirect_uri', redirectUrl)

  return url.toString()
}

export async function fetchAccessToken({
  code,
  clientId,
  clientSecret,
  tokenUrl,
}: {
  code: string
  clientId: string
  clientSecret: string
  tokenUrl: string
}) {
  const {error, response} = await jsonFetch<{access_token: string}>(tokenUrl, {
    method: 'POST',
    data: {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return response.access_token
}
