'use server'

import Link from 'next/link'

import {getVersionsForPackageId} from '@/server/db/packages/getters'
import {Package} from '@/server/db/packages/types'

export async function PackageVersions({package: pkg}: {package: Package}) {
  const packageVersions = await getVersionsForPackageId(pkg.id)

  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold">Versions</h3>

      <div>
        {packageVersions.map((packageVersion) => (
          <div
            key={packageVersion.version}
            className="grid max-w-sm grid-cols-2 gap-2 text-sm"
          >
            <time title={packageVersion.created_at.toUTCString()}>
              {packageVersion.created_at.toLocaleDateString(undefined, {
                dateStyle: 'medium',
              })}
            </time>

            <div className="font-medium ">
              <Link
                className="text-blue-500"
                href={`/packages/${pkg.id}/${packageVersion.version}`}
              >
                {packageVersion.version}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
