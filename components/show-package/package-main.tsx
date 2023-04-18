import {capitalize} from 'lodash'
import React from 'react'

import {OpenApiDocument} from '@/lib/openapi/document'
import {Package} from '@/server/db/packages/types'

import {DocumentAuthentication} from './document-authentication'
import {DocumentEndpoint} from './document-endpoint'
import {PackageInfo} from './package-info'
import {PackageVersions} from './package-versions'

export const PackageMain: React.FC<{package: Package; document: OpenApiDocument}> = ({
  package: pkg,
  document,
}) => {
  return (
    <main className="space-y-16 py-16">
      <div className="space-y-16 px-20">
        <PackageInfo package={pkg} document={document} />

        {/* @ts-expect-error Async Server Component */}
        <PackageVersions package={pkg} />

        <DocumentAuthentication document={document} />
      </div>

      <div className="divide-y divide-slate-900/5">
        {Array.from(document.groupedEndpoints).map(([group, endpoints]) => (
          <div className="space-y-5 px-20 py-10 first:pt-0 last:pb-0" key={group}>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {capitalize(group)}
            </h2>

            <div className="divide-y divide-slate-900/5">
              {endpoints.map((endpoint) => (
                <DocumentEndpoint key={endpoint.path} endpoint={endpoint} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
