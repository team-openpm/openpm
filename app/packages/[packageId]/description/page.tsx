import {ArrowLongLeftIcon} from '@heroicons/react/20/solid'
import Link from 'next/link'
import React from 'react'

import {AccountHeader} from '@/components/account-header'
import {MarkdownDynamic} from '@/components/markdown/markdown-dynamic'
import {getPackageByIdOrNotFound} from '@/server/db/packages/getters'

export const revalidate = 15

export default async function Package({params}: {params: {packageId: string}}) {
  const pkg = await getPackageByIdOrNotFound(params.packageId)

  return (
    <div className="flex">
      <div className="sticky bottom-0 top-0 h-screen w-72 flex-none overflow-auto border-r border-slate-900/10  px-6 py-4 dark:border-white/10">
        <div className="space-y-3">
          <h3 className="flex justify-between font-mono">
            <Link className="text-pink-500 " href="/">
              openpm.ai
            </Link>
          </h3>

          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-white/20">
            <Link className="text-slate-900 dark:text-white/90" href="/apis">
              apis
            </Link>
            <span>/</span>
            <Link className="font-medium text-blue-500" href={`/apis/${pkg.id}`}>
              {pkg.id}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white/90">description</span>
          </div>
        </div>

        <div className="mt-12">
          <Link
            prefetch={false}
            href={`/apis/${pkg.id}`}
            className="flex flex-col space-y-1 text-sm"
          >
            <ArrowLongLeftIcon className="h-5 w-5" />
            <span>Back to api</span>
          </Link>
        </div>
      </div>

      <div className="flex-grow">
        <AccountHeader />

        <div className="px-16 py-16">
          <h1 className="text-medium text-2xl">{pkg.id}</h1>

          <div className="prose prose-sm max-w-none">
            <MarkdownDynamic text={pkg.description ?? ''} />
          </div>
        </div>
      </div>
    </div>
  )
}
