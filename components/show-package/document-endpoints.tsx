import startCase from 'lodash/startCase'

import {OpenApiEndpoint} from '@/lib/openapi/endpoint'

import {DocumentEndpoint} from './document-endpoint'

export function DocumentEndpoints({
  groupedEndpoints,
}: {
  groupedEndpoints: Map<string, OpenApiEndpoint[]>
}) {
  return (
    <div className="divide-y divide-slate-900/5">
      {Array.from(groupedEndpoints).map(([group, endpoints]) => (
        <div className="space-y-5 px-20 py-10 first:pt-0 last:pb-0" key={group}>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {startCase(group)}
          </h2>

          <div className="divide-y divide-slate-900/5">
            {endpoints.map((endpoint) => (
              <DocumentEndpoint key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
