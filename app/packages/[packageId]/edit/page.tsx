'use server'

import React from 'react'

import EditPackageForm from '@/components/edit-package/edit-package-form'
import {MainTemplate} from '@/components/main-template'
import {parseJsonSpec} from '@/helpers/openapi'
import {getPackageForEditByUserOrNotFound} from '@/server/db/packages/getters'
import {authOrRedirect} from '@/server/helpers/auth'

export default async function EditPackage({params}: {params: {packageId: string}}) {
  const userId = await authOrRedirect()

  const pkg = await getPackageForEditByUserOrNotFound({
    packageId: params.packageId,
    userId,
  })

  const doc = await parseJsonSpec(pkg.openapi)

  const hasOauth = doc.hasOauth

  return (
    <MainTemplate>
      <EditPackageForm package={pkg} hasOauth={hasOauth} />
    </MainTemplate>
  )
}
