import Link from 'next/link'

import {formatDistanceToNow} from '@/lib/format-distance'
import {PackageLite} from '@/server/db/packages/types'

export function PackageItem({pkg}: {pkg: PackageLite}) {
  return (
    <li
      className="rounded-xl bg-white/50 ring-1 ring-pink-900/10 backdrop-blur-md hover:bg-white/70 dark:bg-white/5 dark:ring-pink-400/50"
      key={pkg.id}
    >
      <Link prefetch={false} href={`/apis/${pkg.id}`} className="flex flex-col px-5 py-3">
        <div className="grid grid-cols-2 gap-1">
          <div className="truncate font-medium text-pink-500">{pkg.id}</div>

          <div className="text-right text-blue-500">{pkg.domain}</div>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <div className="truncate">{pkg.description}</div>

          <div className="text-right text-sm text-slate-900/80 dark:text-white/70">
            {pkg.version}{' '}
            <time title={pkg.published_at.toUTCString()}>
              published {formatDistanceToNow(pkg.published_at)}
            </time>
          </div>
        </div>
      </Link>
    </li>
  )
}
