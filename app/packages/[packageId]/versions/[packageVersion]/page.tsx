import React from 'react'

import {AccountHeader} from '@/components/account-header'
import {PackageMain} from '@/components/show-package/package-main'
import {PackageSidebar} from '@/components/show-package/package-sidebar'
import {parseJsonSpec} from '@/helpers/openapi'
import {OpenApiEndpoint} from '@/helpers/openapi/endpoint'
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
  const pkgVersion = await getPackageVersionOrNotFound({
    packageId: params.packageId,
    version: params.packageVersion,
  })
  const doc = await parseJsonSpec(pkgVersion.openapi)

  let groupedEndpoints: Map<string, OpenApiEndpoint[]>
  let pagedEndpoints = false

  if (doc.pagedEndpoints) {
    groupedEndpoints = doc.firstGroupedEndpoint
    pagedEndpoints = true
  } else {
    groupedEndpoints = doc.groupedEndpoints
  }

  return (
    <div className="flex">
      <div className="flex-none">
        <PackageSidebar
          package={pkg}
          document={doc}
          pagedEndpoints={pagedEndpoints}
          version={pkgVersion.version}
        />
      </div>

      <div className="flex-grow">
        <AccountHeader />

        <PackageMain package={pkg} document={doc} groupedEndpoints={groupedEndpoints} />
      </div>
    </div>
  )
}
