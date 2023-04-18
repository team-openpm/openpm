import {truncate} from 'lodash'
import Link from 'next/link'
import {useMemo} from 'react'

import {cleanDescription} from '@/lib/description'
import {formatDistanceToNow} from '@/lib/format-distance'

import {PackageResponse} from './types'

export function PackageItem({pkg}: {pkg: PackageResponse}) {
  const publishedAt = useMemo(() => new Date(pkg.published_at), [pkg.published_at])

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
          <div className="truncate text-sm">
            {pkg.description
              ? truncate(cleanDescription(pkg.description), {length: 80})
              : null}
          </div>

          <div className="text-right text-sm text-slate-900/80 dark:text-white/70">
            {pkg.version}{' '}
            <time title={publishedAt.toUTCString()}>
              published {formatDistanceToNow(publishedAt)}
            </time>
          </div>
        </div>
      </Link>
    </li>
  )
}
