import {OpenApiDocument} from '@/helpers/openapi/document'
import {FullPackage} from '@/server/db/packages/types'

import {DocumentAuthentication} from './document-authentication'
import {PackageInfo} from './package-info'
import {PackageVersions} from './package-versions'

export function PackageHeader({
  package: pkg,
  document,
}: {
  package: FullPackage
  document: OpenApiDocument
}) {
  return (
    <header className="space-y-16 px-20">
      <PackageInfo package={pkg} document={document} />

      <PackageVersions package={pkg} />

      <DocumentAuthentication document={document} />
    </header>
  )
}
