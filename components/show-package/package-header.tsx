import {OpenApiDocument} from '@/helpers/openapi/document'
import {Package} from '@/server/db/packages/types'

import {DocumentAuthentication} from './document-authentication'
import {PackageInfo} from './package-info'
import {PackageVersions} from './package-versions'

export function PackageHeader({
  package: pkg,
  document,
}: {
  package: Package
  document: OpenApiDocument
}) {
  return (
    <header className="space-y-16 px-20">
      <PackageInfo package={pkg} document={document} />

      {/* @ts-expect-error Async Server Component */}
      <PackageVersions package={pkg} />

      <DocumentAuthentication document={document} />
    </header>
  )
}
