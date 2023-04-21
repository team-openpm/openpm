import first from 'lodash/first'
import {headers} from 'next/headers'
import {redirect} from 'next/navigation'

import {getUserIdFromApiKey} from '@/server/db/api-keys/getters'
import {getUserById} from '@/server/db/users/getters'

import {getEmailsFromSessionToken, safeGetUserIdFromSessionToken} from './session'
import {getToken} from './token'
import {error} from '../error'

export function auth() {
  const headersList = headers()
  const [authType, token] = getToken(headersList)

  if (!token) {
    return null
  }

  return getUserId(authType, token)
}

/**
 * Authenticates a user and redirects them to a specified URL if not authenticated.
 * @param {string} redirectBack - The relative path to redirect back to after authentication (optional).
 * @returns {Promise<string>} A promise that resolves to the authenticated user's ID.
 */
export async function authOrRedirect(redirectBack: string = ''): Promise<string> {
  const userId = await auth()

  if (!userId) {
    redirect(`/auth${redirectBack ? `?redirect=${redirectBack}` : ''}`)
  }

  return userId
}

export async function getSessionEmails(): Promise<string[] | null> {
  const headersList = headers()
  const [authType, token] = getToken(headersList)

  if (authType != 'session') {
    return null
  }

  if (!token) {
    return null
  }

  return getEmailsFromSessionToken(token)
}

export async function getSessionInfo() {
  const userId = await auth()

  if (!userId) {
    return null
  }

  const user = await getUserById(userId)

  return {
    userId: userId,
    userEmail: first(user?.emails) ?? null,
  }
}

export async function getSessionInfoOrRedirect() {
  const sessionInfo = await getSessionInfo()

  if (!sessionInfo) {
    redirect('/auth')
  }

  return sessionInfo
}

export function withAuth<U extends {userId: string}>(
  callback: (request: Request, args: U) => Promise<Response>,
) {
  return async (request: Request, args: U) => {
    const [authType, token] = getToken(request.headers)

    if (!token) {
      return error('Authentication required', 'invalid_request', 401)
    }

    const userId = await getUserId(authType, token)

    if (!userId) {
      return error('Invalid token', 'invalid_token', 401)
    }

    const argsWithUserId: U = {...args, userId} as U & {userId: string}

    return callback(request, argsWithUserId)
  }
}

async function getUserId(
  authType: 'api' | 'session' | null,
  token: string,
): Promise<string | null> {
  switch (authType) {
    case 'api':
      return getUserIdFromApiToken(token)
    case 'session':
      return safeGetUserIdFromSessionToken(token)
    default:
      throw new Error('Invalid token')
  }
}

async function getUserIdFromApiToken(token: string) {
  return getUserIdFromApiKey({apiKey: token})
}
