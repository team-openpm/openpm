import truncate from 'lodash/truncate'
import React from 'react'

import {AccountHeader} from '@/components/account-header'
import {DocumentEndpoints} from '@/components/show-package/document-endpoints'
import {PackageHeader} from '@/components/show-package/package-header'
import {PackageSidebar} from '@/components/show-package/package-sidebar'
import {parseJsonSpec} from '@/lib/openapi'
import {OpenApiEndpoint} from '@/lib/openapi/endpoint'
import {getAllPackageIds, getPackageByIdOrNotFound} from '@/server/db/packages/getters'

export const revalidate = 15

export async function generateStaticParams() {
  const packages = await getAllPackageIds()

  return packages.map((pkg) => ({
    packageId: pkg.id,
  }))
}

export async function generateMetadata({params}: {params: {packageId: string}}) {
  const pkg = await getPackageByIdOrNotFound(params.packageId)

  const title = `${pkg.id} | openpm`
  const description = truncate(pkg.description || 'OpenAPI package manager', {
    length: 160,
  })

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://openpm.ai/packages/${pkg.id}`,
      siteName: 'openpm',
      locale: 'en-US',
      type: 'website',
    },
  }
}

export default async function PackageEndpoint({params}: {params: {packageId: string}}) {
  const pkg = await getPackageByIdOrNotFound(params.packageId)
  const doc = await parseJsonSpec(pkg.openapi)

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
        <PackageSidebar package={pkg} document={doc} pagedEndpoints={pagedEndpoints} />
      </div>

      <div className="flex-grow">
        <AccountHeader />

        <main className="space-y-16 py-16">
          <PackageHeader package={pkg} document={doc} />
          <DocumentEndpoints groupedEndpoints={groupedEndpoints} />
        </main>
      </div>
    </div>
  )
}
