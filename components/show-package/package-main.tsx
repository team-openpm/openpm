import React from 'react'

import {OpenApiDocument} from '@/helpers/openapi/document'
import {OpenApiEndpoint} from '@/helpers/openapi/endpoint'
import {FullPackage} from '@/server/db/packages/types'

import {DocumentEndpoints} from './document-endpoints'
import {PackageHeader} from './package-header'

export const PackageMain: React.FC<{
  package: FullPackage
  document: OpenApiDocument
  groupedEndpoints: Map<string, OpenApiEndpoint[]>
}> = ({package: pkg, document, groupedEndpoints}) => {
  return (
    <main className="space-y-16 py-16">
      <PackageHeader package={pkg} document={document} />
      <DocumentEndpoints groupedEndpoints={groupedEndpoints} />
    </main>
  )
}
