'use server'

import React from 'react'

import ConnectPackageForm from '@/components/connect-package/connect-package-form'
import {MainTemplate} from '@/components/main-template'
import {getPackageByIdOrNotFound} from '@/server/db/packages/getters'
import {authOrRedirect} from '@/server/helpers/auth'

export default async function ConnectPackage({params}: {params: {packageId: string}}) {
  await authOrRedirect()

  const pkg = await getPackageByIdOrNotFound(params.packageId)

  return (
    <MainTemplate>
      <ConnectPackageForm package={pkg} />
    </MainTemplate>
  )
}
