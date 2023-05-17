import clsx from 'clsx'
import startCase from 'lodash/startCase'
import Link from 'next/link'
import React from 'react'

import {OpenApiDocument} from '@/helpers/openapi/document'
import {LitePackage} from '@/server/db/packages/types'

export const PackageSidebar: React.FC<{
  package: LitePackage
  document: OpenApiDocument
  pagedEndpoints: boolean
  version?: string
}> = ({package: pkg, document, pagedEndpoints, version}) => {
  const versionPath = version ? `/versions/${version}` : ''

  return (
    <aside className="sticky bottom-0 top-0 h-screen w-72 flex-1 overflow-auto border-r border-slate-900/10  px-6 py-4 dark:border-white/10">
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
        </div>
      </div>

      <div className="space-y-8 pt-24">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white">API</h3>
          <ul role="list" className="border-l border-slate-900/10 dark:border-white/5">
            <li className="relative">
              <a
                className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                href={`/apis/${pkg.id}${versionPath}#intro`}
              >
                <span className="truncate">Introduction</span>
              </a>

              {document.hasAuthentication && (
                <a
                  className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  href={`/apis/${pkg.id}${versionPath}#auth`}
                >
                  <span className="truncate">Authentication</span>
                </a>
              )}
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          {Array.from(document.groupedEndpoints).map(([group, endpoints]) => (
            <div key={group} className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                {startCase(group)}
              </h3>

              <ul
                role="list"
                className="border-l border-slate-900/10 dark:border-white/5"
              >
                {endpoints.map((endpoint, index) => (
                  <li key={index} className="relative">
                    <a
                      className="flex cursor-pointer justify-between gap-2 py-1 pl-4 pr-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      href={
                        pagedEndpoints
                          ? `/apis/${pkg.id}${versionPath}/endpoint?path=${endpoint.path}`
                          : `#${endpoint.path}`
                      }
                      title={`${endpoint.method} ${endpoint.path}`}
                    >
                      <span className="truncate">
                        {endpoint.description || endpoint.path}
                      </span>

                      {endpoint.method && (
                        <span
                          className={clsx('text-[10px] font-semibold uppercase', {
                            'text-blue-500': endpoint.method === 'get',
                            'text-green-500': endpoint.method === 'post',
                            'text-orange-500':
                              endpoint.method === 'patch' || endpoint.method === 'put',
                            'text-red-500': endpoint.method === 'delete',
                          })}
                        >
                          {endpoint.method}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
