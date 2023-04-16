import React from 'react'

import {OpenApiSchema} from '@/lib/openapi/schema'

export const DocumentSchema: React.FC<{
  schema: OpenApiSchema
  nestled: boolean
}> = ({schema, nestled: _nested}) => {
  if (!schema.name) {
    return (
      <>
        {schema.properties.length > 0 && (
          <div className="space-y-5">
            {schema.properties.map((property) => (
              <DocumentSchema key={property.name} schema={property} nestled={true} />
            ))}
          </div>
        )}

        {schema.items && (
          <div className="space-y-5">
            <DocumentSchema schema={schema.items} nestled={true} />
          </div>
        )}
      </>
    )
  }

  return (
    <div className="space-y-4 text-sm">
      <dl className="flex flex-wrap items-center gap-x-5">
        {schema.name && (
          <div className="min-w-sm flex min-w-[100px] items-center">
            <dt className="sr-only">Name</dt>
            <dd>
              <code className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-900 ring-1 ring-zinc-300">
                {schema.name}
              </code>
            </dd>
          </div>
        )}

        {schema.type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {schema.type}
            </dd>
          </>
        )}

        {schema.required && <dd className="text-xs text-red-500">Required</dd>}

        {schema.description && (
          <>
            <dt className="sr-only">Description</dt>
            <dd className="mt-1 w-full flex-none">{schema.description}</dd>
          </>
        )}
      </dl>

      {schema.properties.length > 0 && (
        <div className="divide-y divide-slate-900/5 border border-slate-900/5 px-5 py-5">
          {schema.properties.map((property) => (
            <DocumentSchema key={property.name} schema={property} nestled={true} />
          ))}
        </div>
      )}

      {schema.items && (
        <div className="border border-slate-900/5 px-5 py-5">
          {schema.items && <DocumentSchema schema={schema.items} nestled={true} />}
        </div>
      )}
    </div>
  )
}
