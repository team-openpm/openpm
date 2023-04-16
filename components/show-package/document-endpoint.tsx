import clsx from 'clsx'

import {OpenApiEndpoint} from '@/lib/openapi/endpoint'

import {DocumentEndpointRequestExample} from './document-endpoint-request-example'
import {DocumentEndpointResponseExample} from './document-endpoint-response-example'
import {DocumentSchema} from './document-schema'

export function DocumentEndpoint({endpoint}: {endpoint: OpenApiEndpoint}) {
  return (
    <div
      className="grid grid-cols-1 items-start gap-x-16 gap-y-10 py-12 xl:max-w-none xl:grid-cols-2"
      id={endpoint.path}
    >
      <div className="space-y-8">
        <section className="space-y-2">
          <h3
            className={clsx('space-x-3 font-mono text-sm', {
              'text-blue-500': endpoint.method === 'GET',
              'text-green-500': endpoint.method === 'POST',
              'text-orange-500': endpoint.method === 'PATCH',
              'text-red-500': endpoint.method === 'DELETE',
            })}
          >
            <div
              className={clsx(
                'inline-flex rounded-lg px-1.5 font-mono text-[0.625rem] font-semibold leading-6 ring-1 ring-inset',
                {
                  'bg-blue-400/10 ring-blue-300 dark:text-blue-400 dark:ring-blue-400/30':
                    endpoint.method === 'GET',
                  'bg-green-400/10 ring-green-300 dark:text-green-400 dark:ring-green-400/30':
                    endpoint.method === 'POST',
                  'bgring-ange-300 bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/30':
                    endpoint.method === 'PATCH',
                  'bg-red-400/10ring--red-300 dark:text-red-400 dark:ring-red-400/30':
                    endpoint.method === 'DELETE',
                },
              )}
            >
              {endpoint.method}
            </div>
            <span>{endpoint.path}</span>
          </h3>

          <h4 className="text-sm">{endpoint.description}</h4>
        </section>

        {endpoint.pathParameters.length > 0 && (
          <section>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Path parameters
            </h4>

            <div className="mt-5 w-1/2">
              <ul
                role="list"
                className="m-0 list-none divide-y divide-slate-900/5 p-0 dark:divide-white/5"
              >
                {endpoint.pathParameters.map((parameter, index) => (
                  <li key={index} className="m-0 px-0 py-4 first:pt-0 last:pb-0">
                    <dl className="m-0 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                      <dt className="sr-only">Name</dt>
                      <dd>
                        <code className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-900 ring-1 ring-slate-300 dark:bg-white/5 dark:text-white dark:ring-white/10">
                          {parameter.name}
                        </code>
                      </dd>
                      <dt className="sr-only">Type</dt>
                      <dd className="font-mono text-xs text-slate-400 dark:text-slate-500">
                        {parameter.schema?.type}
                      </dd>
                      {parameter.required && (
                        <dd className="text-xs text-red-500">Required</dd>
                      )}
                      <dt className="sr-only">Description</dt>
                      <dd className="w-full flex-none">{parameter.description}</dd>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {endpoint.bodySchema && (
          <section className="space-y-5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Body params
            </h4>

            <DocumentSchema schema={endpoint.bodySchema} nestled={false} />
          </section>
        )}
      </div>

      <div className="space-y-14 py-5">
        {/* @ts-expect-error Async Server Component */}
        <DocumentEndpointRequestExample requestExample={endpoint.requestExample} />

        {endpoint.responseExample && (
          /* @ts-expect-error Async Server Component */
          <DocumentEndpointResponseExample responseExample={endpoint.responseExample} />
        )}
      </div>
    </div>
  )
}
