'use server'

import React from 'react'

import EditPackageForm from '@/components/edit-package/edit-package-form'
import {MainTemplate} from '@/components/main-template'
import {getPackageForEditByUserOrNotFound} from '@/server/db/packages/getters'
import {authOrRedirect} from '@/server/helpers/auth'
import {parseJsonSpec} from '@/helpers/openapi'

export default async function EditPackage({params}: {params: {packageId: string}}) {
  const userId = await authOrRedirect()

  const pkg = await getPackageForEditByUserOrNotFound({
    packageId: params.packageId,
    userId,
  })

  const doc = await parseJsonSpec(pkg.openapi)

  const usesOauth = doc.hasOauthAuthentication

  return (
    <MainTemplate>
      <EditPackageForm package={pkg} usesOauth={usesOauth} />
    </MainTemplate>
  )
}
