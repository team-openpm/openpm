type AuthType = 'api' | 'session'
type AuthTypeToken = [AuthType | null, string | null]

interface HeaderLike {
  get: (name: string) => string | null
}

export function getToken(headers: HeaderLike): AuthTypeToken {
  return getTokenFromHeader(headers) || getTokenFromCookie(headers) || [null, null]
}

function getTokenFromHeader(headers: HeaderLike): AuthTypeToken | null {
  const authorization = headers.get('Authorization')

  if (!authorization) {
    return null
  }

  const [scheme, value] = authorization.split(' ')

  if (scheme === 'Bearer') {
    return ['api', value]
  }

  if (scheme === 'Basic') {
    const decodedValue = decodeBase64(value)
    const [token] = decodedValue.split(':')
    return ['api', token]
  }

  return null
}

function getTokenFromCookie(
  headers: HeaderLike,
  cookieName = 'hanko',
): AuthTypeToken | null {
  const cookie = headers.get('Cookie')

  if (!cookie) {
    return null
  }

  const cookies = cookie.split('; ')

  const tokenCookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`))

  if (!tokenCookie) {
    return null
  }

  const [, token] = tokenCookie.split('=')

  return ['session', token]
}

const decodeBase64 = (value: string) => Buffer.from(value, 'base64').toString('ascii')
