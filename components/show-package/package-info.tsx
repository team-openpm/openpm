import Link from 'next/link'

import {OpenApiDocument} from '@/helpers/openapi/document'
import {Package} from '@/server/db/packages/types'

import {PackageDescription} from './package-description'

export function PackageInfo({
  package: pkg,
  document,
}: {
  package: Package
  document: OpenApiDocument
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-xl font-medium" id="intro">
          {pkg.id}
        </h1>

        {pkg.version !== document.version && (
          <>
            <div className="inline-flex space-x-1 rounded-md bg-pink-500/20 px-2 text-xs font-medium">
              <span>A newer version of this package</span>
              <Link className="text-blue-500" href={`/packages/${pkg.id}/${pkg.version}`}>
                is available
              </Link>
              .
            </div>
          </>
        )}
      </div>

      <div className="grid max-w-sm grid-cols-2 gap-2 text-sm">
        {pkg.version !== document.version && (
          <>
            <div>Viewing version</div>
            <div className="font-medium">
              <Link
                className="text-blue-500"
                href={`/packages/${pkg.id}/${document.version}`}
              >
                {document.version}
              </Link>
            </div>
          </>
        )}

        <div>Latest version</div>
        <div className="font-medium">
          <Link className="text-blue-500" href={`/packages/${pkg.id}/${pkg.version}`}>
            {pkg.version}
          </Link>
        </div>

        <div>Domain</div>
        <div className="font-medium ">
          <a href={`https://${pkg.domain}`} className="text-blue-500">
            {pkg.domain}
          </a>
        </div>

        <div className="">OpenAPI file</div>

        <div className="font-medium ">
          <a href={`/packages/${pkg.id}/openapi`} className="text-blue-500">
            HTML
          </a>
          {' / '}
          <a href={`/packages/${pkg.id}/openapi.json`} className="text-blue-500">
            JSON
          </a>
          {' / '}
          <a href={`/packages/${pkg.id}/openapi.yaml`} className="text-blue-500">
            YAML
          </a>
        </div>
      </div>

      {pkg.description && (
        <PackageDescription
          packageId={pkg.id}
          description={pkg.description}
          maxLength={200}
        />
      )}
    </div>
  )
}
