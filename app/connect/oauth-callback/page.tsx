'use server'

import {redirect} from 'next/navigation'

import {fetchAccessToken} from '@/helpers/proxy/oauth'
import {assertString} from '@/lib/assert'
import {getUnsafePackageById} from '@/server/db/packages/getters'
import {createUserConnection} from '@/server/db/user-connections/setters'
import {authOrRedirect} from '@/server/helpers/auth'

export default async function ConnectOAuthCallback(request: Request) {
  const userId = await authOrRedirect()

  const {searchParams} = new URL(request.url)
  const packageId = searchParams.get('package_id')
  const code = searchParams.get('code')

  assertString(packageId, 'package_id')
  assertString(code, 'code')

  const pkg = await getUnsafePackageById(packageId)

  if (!pkg) {
    redirect('/packages')
  }

  assertString(pkg.oauth_authorization_url, 'oauth_authorization_url')
  assertString(pkg.oauth_client_id, 'oauth_client_id')
  assertString(pkg.oauth_client_secret, 'oauth_client_secret')
  assertString(pkg.oauth_token_url, 'oauth_token_url')

  const accessToken = await fetchAccessToken({
    code,
    clientId: pkg.oauth_client_id,
    clientSecret: pkg.oauth_client_secret,
    tokenUrl: pkg.oauth_token_url,
  })

  await createUserConnection({
    packageId,
    userId,
    accessToken,
  })

  redirect(`/account`)
}
