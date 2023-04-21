'use server'

import {redirect} from 'next/navigation'
import React from 'react'

import ConnectPackageForm from '@/components/connect-package/connect-package-form'
import {MainTemplate} from '@/components/main-template'
import {parseJsonSpec} from '@/helpers/openapi'
import {getUnsafePackageById} from '@/server/db/packages/getters'
import {authOrRedirect} from '@/server/helpers/auth'

export default async function ConnectPackage({params}: {params: {packageId: string}}) {
  await authOrRedirect()

  const pkg = await getUnsafePackageById(params.packageId)

  if (!pkg) {
    redirect('/packages')
  }

  const doc = await parseJsonSpec(pkg.openapi)

  if (doc.hasOauth) {
    redirect(`/packages/${pkg.id}/connect/oauth`)
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
