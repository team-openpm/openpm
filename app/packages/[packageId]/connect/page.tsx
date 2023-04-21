'use server'

import {redirect} from 'next/navigation'
import React from 'react'

import ConnectPackageForm from '@/components/connect-package/connect-package-form'
import {MainTemplate} from '@/components/main-template'
import {parseJsonSpec} from '@/helpers/openapi'
import {buildAuthorizationUrl} from '@/helpers/proxy/oauth'
import {assertString} from '@/lib/assert'
import {getUnsafePackageById} from '@/server/db/packages/getters'
import {authOrRedirect} from '@/server/helpers/auth'

export default async function ConnectPackage(
  request: Request,
  {params}: {params: {packageId: string}},
) {
  await authOrRedirect()

  const requestUrl = new URL(request.url)
  const pkg = await getUnsafePackageById(params.packageId)

  if (!pkg) {
    redirect('/packages')
  }

  const doc = await parseJsonSpec(pkg.openapi)

  if (doc.hasOauth) {
    assertString(pkg.oauth_authorization_url, 'oauth_authorization_url')
    assertString(pkg.oauth_client_id, 'oauth_client_id')

    const redirectUrl = buildAuthorizationUrl({
      authorizationUrl: pkg.oauth_authorization_url,
      redirectUrl: `${requestUrl.origin}/packages/${pkg.id}/connect/oauth-callback`,
      clientId: pkg.oauth_client_id,
    })

    redirect(redirectUrl)
  }

  if (doc.hasApiKey) {
    return (
      <MainTemplate>
        <ConnectPackageForm package={pkg} />
      </MainTemplate>
    )
  }

  redirect(`/packages/${pkg.id}`)
}
