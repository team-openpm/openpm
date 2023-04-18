import {decode, verify} from 'jsonwebtoken'
import jwksRsa from 'jwks-rsa'

import {assertString} from '@/lib/assert'

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL

const jwksClient = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 2,
  jwksUri: `${hankoApiUrl}/.well-known/jwks.json`,
})

interface HankoEmailResponse {
  id: string
  address: string
  is_verified: boolean
  is_primary: boolean
}

export async function getUserIdFromSessionToken(token: string) {
  const decodedToken = decode(token, {complete: true})

  if (!decodedToken) {
    throw new Error('Invalid token')
  }

  const key = await jwksClient.getSigningKey(decodedToken.header.kid)

  if (!key) {
    throw new Error('Invalid token')
  }

  verify(token, key.getPublicKey(), {
    algorithms: ['RS256'],
  })

  const userId = decodedToken.payload.sub
  assertString(userId, 'userId is not a string')

  return userId
}

export async function safeGetUserIdFromSessionToken(token: string) {
  try {
    return await getUserIdFromSessionToken(token)
  } catch (error) {
    return null
  }
}

export const getEmailsFromSessionToken = async (
  token: string,
): Promise<null | string[]> => {
  const request = await fetch(`${hankoApiUrl}/emails`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 120,
    },
  })

  if (!request.ok) {
    console.error(
      'Failed to fetch emails from Hanko API:',
      request.statusText,
      await request.text(),
    )
    return null
  }

  const emails = (await request.json()) as HankoEmailResponse[]

  // Sort emails and make sure primary is first
  emails.sort((a, b) => (a.is_primary ? -1 : b.is_primary ? 1 : 0))

  return emails.map((email) => email.address)
}
