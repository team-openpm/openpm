import truncate from 'lodash/truncate'
import React from 'react'

import {AccountHeader} from '@/components/account-header'
import {PackageMain} from '@/components/show-package/package-main'
import {PackageSidebar} from '@/components/show-package/package-sidebar'
import {parseSpecJson} from '@/lib/openapi'
import {getAllPackageIds, getPackageByIdOrNotFound} from '@/server/db/packages/getters'

export const revalidate = 30

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
