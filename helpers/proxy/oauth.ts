// OAuth Helpers

import {generateId} from '@/lib/generate-id'

export function buildAuthorizationUrl({
  authorizationUrl,
  redirectUrl,
  clientId,
}: {
  authorizationUrl: string
  redirectUrl: string
  clientId: string
}) {
  const url = new URL(authorizationUrl)

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
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`)
  }

  const {access_token: accessToken} = (await response.json()) as {
    access_token: string
  }

  return accessToken
}
