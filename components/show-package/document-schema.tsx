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
    <div className="space-y-4 py-4 text-sm first:pt-0 last:pb-0">
      <dl className="flex flex-wrap items-center gap-x-5">
        {schema.name && (
          <div className="min-w-sm flex min-w-[100px] items-center">
            <dt className="sr-only">Name</dt>
            <dd>
              <code className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-900 ring-1 ring-slate-300 dark:bg-white/5 dark:text-white dark:ring-white/10">
                {schema.name}
              </code>
            </dd>
          </div>
        )}

        {schema.type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-slate-400 dark:text-slate-500">
              {schema.type}
            </dd>
          </>
        )}

        {schema.required && <dd className="text-xs text-red-500">Required</dd>}

        {schema.description && (
          <>
            <dt className="sr-only">Description</dt>
            <dd className="inl mt-3 w-full flex-none">{schema.description}</dd>
          </>
        )}
      </dl>

      {schema.properties.length > 0 && (
        <div className="divide-y divide-slate-900/5 border border-slate-900/5 px-5 py-5 dark:divide-white/5 dark:border-white/5">
          {schema.properties.map((property) => (
            <DocumentSchema key={property.name} schema={property} nestled={true} />
          ))}
        </div>
      )}

      {schema.items && (
        <div className="border border-slate-900/5 px-5 py-5 dark:border-white/5">
          {schema.items && <DocumentSchema schema={schema.items} nestled={true} />}
        </div>
      )}
    </div>
  )
}
