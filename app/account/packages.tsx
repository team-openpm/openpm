'use server'

import Link from 'next/link'

import {getAllPackagesForUserId} from '@/server/db/packages/getters'

export async function Packages({userId}: {userId: string}) {
  const packages = await getAllPackagesForUserId(userId)

  return (
    <section className="space-y-3" id="packages">
      <h2 className="text-base font-medium">Packages</h2>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg.id}>
            <dl className="grid max-w-sm grid-cols-3 gap-x-5 gap-y-2 text-sm">
              <dt className="sr-only">Id</dt>
              <dd>
                <Link
                  prefetch={false}
                  href={`/apis/${pkg.id}`}
                  className="text-sm font-medium text-blue-500"
                >
                  {pkg.id}
                </Link>
              </dd>
              <dt className="sr-only">Version</dt>
              <dd className="text-sm text-slate-700">{pkg.version}</dd>
              <dt className="sr-only">Actions</dt>
              <dd>
                <Link
                  prefetch={false}
                  href={`/apis/${pkg.id}/edit`}
                  className="text-xs font-medium text-blue-500"
                >
                  Edit
                </Link>
              </dd>
            </dl>
          </li>
        ))}
      </ul>

      <footer>
        <Link href="/new" className="text-xs text-blue-500">
          New package...
        </Link>
      </footer>
    </section>
  )
}
