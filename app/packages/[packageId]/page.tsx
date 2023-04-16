import React from 'react'

import {AccountHeader} from '@/components/account-header'
import {PackageMain} from '@/components/show-package/package-main'
import {PackageSidebar} from '@/components/show-package/package-sidebar'
import {parseSpecJson} from '@/lib/openapi'
import {getPackageByIdOrNotFound} from '@/server/db/packages/getters'

export const revalidate = 30

export default async function Package({params}: {params: {packageId: string}}) {
  const pkg = await getPackageByIdOrNotFound(params.packageId)
  const doc = await parseSpecJson(pkg.openapi)

  return (
    <div className="flex">
      <div className="flex-none">
        <PackageSidebar package={pkg} document={doc} />
      </div>

      <div className="flex-grow">
        <AccountHeader />

        <PackageMain package={pkg} document={doc} />
      </div>
    </div>
  )
}
