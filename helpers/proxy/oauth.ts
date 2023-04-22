// OAuth Helpers

import {generateId} from '@/lib/generate-id'

export function getOrigin(headers: {get: (key: string) => string | null}) {
  const host = headers.get('host')
  const protocol = headers.get('x-forwarded-proto') ?? 'http'

  return `${protocol}://${host}`
}

export function buildAuthorizationUrl({
  packageId,
  authorizationUrl,
  redirectUrl,
  clientId,
}: {
  packageId: string
  authorizationUrl: string
  redirectUrl: string
  clientId: string
}) {
  const uri = new URL(authorizationUrl)

  const redirectUri = new URL(redirectUrl)
  redirectUri.searchParams.set('package_id', packageId)

  uri.searchParams.set('client_id', clientId)
  uri.searchParams.set('state', generateId())
  uri.searchParams.set('redirect_uri', redirectUri.toString())
  uri.searchParams.set('response_type', 'code')

  return uri.toString()
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
