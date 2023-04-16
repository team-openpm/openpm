'use server'

import {redirect} from 'next/navigation'
import React from 'react'

import EditPackageForm from '@/components/edit-package/edit-package-form'
import {MainTemplate} from '@/components/main-template'
import {getPackageByIdOrNotFound} from '@/server/db/packages/getters'
import {authOrRedirect} from '@/server/helpers/auth'

export default async function EditPackage({params}: {params: {packageId: string}}) {
  const userId = await authOrRedirect()

  const pkg = await getPackageByIdOrNotFound(params.packageId)

  if (!pkg.acl_write.includes(userId)) {
    redirect('/packages')
  }

  return (
    <MainTemplate>
      <EditPackageForm package={pkg} />
    </MainTemplate>
  )
}
