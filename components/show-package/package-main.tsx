import React from 'react'

import {OpenApiDocument} from '@/lib/openapi/document'
import {OpenApiEndpoint} from '@/lib/openapi/endpoint'
import {Package} from '@/server/db/packages/types'

import {DocumentEndpoints} from './document-endpoints'
import {PackageHeader} from './package-header'

export const PackageMain: React.FC<{
  package: Package
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
