import truncate from 'lodash/truncate'
import Link from 'next/link'
import React from 'react'

import {AccountHeader} from '@/components/account-header'
import {MainTemplate} from '@/components/main-template'
import {PackageMain} from '@/components/show-package/package-main'
import {PackageSidebar} from '@/components/show-package/package-sidebar'
import {parseOpenApiSpecJson} from '@/lib/openapi'
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

export default async function Package({params}: {params: {packageId: string}}) {
  const pkg = await getPackageByIdOrNotFound(params.packageId)

  if (pkg.openapi.length > MAX_PACKAGE_SIZE) {
    return <TooLargeToRender packageId={pkg.id} />
  }

  const doc = await parseOpenApiSpecJson(pkg.openapi)

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

// Can't be larger than 300kb
const MAX_PACKAGE_SIZE = 300 * 1024

function TooLargeToRender({packageId}: {packageId: string}) {
  return (
    <MainTemplate>
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl">Package too large to render</h2>

        <h3>
          <Link className="text-blue-500" href={`/api/packages/${packageId}/openapi`}>
            See full OpenAPI spec
          </Link>
        </h3>
      </div>
    </MainTemplate>
  )
}
