import React from 'react'

import {AccountHeader} from '@/components/account-header'
import {PackageMain} from '@/components/show-package/package-main'
import {PackageSidebar} from '@/components/show-package/package-sidebar'
import {parseSpecJson} from '@/lib/openapi'
import {
  getPackageByIdOrNotFound,
  getPackageVersionOrNotFound,
} from '@/server/db/packages/getters'

export const revalidate = 15

export default async function PackageVersion({
  params,
}: {
  params: {packageId: string; packageVersion: string}
}) {
  const pkg = await getPackageByIdOrNotFound(params.packageId)
  const version = await getPackageVersionOrNotFound({
    packageId: params.packageId,
    version: params.packageVersion,
  })
  const doc = await parseSpecJson(version.openapi)

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
