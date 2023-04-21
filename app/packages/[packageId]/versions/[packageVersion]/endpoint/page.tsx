import truncate from 'lodash/truncate'
import {redirect} from 'next/navigation'
import React from 'react'

import {AccountHeader} from '@/components/account-header'
import {DocumentEndpoints} from '@/components/show-package/document-endpoints'
import {PackageSidebar} from '@/components/show-package/package-sidebar'
import {parseJsonSpec} from '@/lib/openapi'
import {
  getPackageByIdOrNotFound,
  getPackageVersionOrNotFound,
} from '@/server/db/packages/getters'

export const revalidate = 60

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

export default async function PackageVersionEndpoint({
  params,
  searchParams,
}: {
  params: {packageId: string; packageVersion: string}
  searchParams: {path: string}
}) {
  const pkg = await getPackageByIdOrNotFound(params.packageId)
  const version = await getPackageVersionOrNotFound({
    packageId: params.packageId,
    version: params.packageVersion,
  })
  const doc = await parseJsonSpec(version.openapi)

  if (!searchParams.path) {
    redirect(`/packages/${pkg.id}`)
  }

  const groupedEndpoints = doc.groupedEndpointsForPath(searchParams.path)

  return (
    <div className="flex">
      <div className="flex-none">
        <PackageSidebar
          package={pkg}
          document={doc}
          pagedEndpoints={true}
          version={version.version}
        />
      </div>

      <div className="flex-grow">
        <AccountHeader />

        <main className="py-16">
          <DocumentEndpoints groupedEndpoints={groupedEndpoints} />
        </main>
      </div>
    </div>
  )
}
