'use server'

import {Code} from '@/components/code'
import {safeHighlight} from '@/lib/code-highlighter'
import {OpenApiResponseExample} from '@/lib/openapi/response-example'

export async function DocumentEndpointResponseExample({
  responseExample,
}: {
  responseExample: OpenApiResponseExample
}) {
  const exampleJson = responseExample.exampleJson

  if (!exampleJson) {
    return null
  }

  const exampleJsonHtml = await safeHighlight(exampleJson, 'json')

  return (
    <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-md dark:ring-1 dark:ring-white/10">
      <div className="flex h-12 flex-wrap items-center gap-x-4 border-b border-slate-700 bg-slate-800 px-4 dark:border-slate-800 dark:bg-transparent">
        <h3 className="text-xs font-semibold text-white">Response</h3>

        <div className="flex-1" />

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex h-12 items-center border-b border-emerald-500 text-emerald-400">
            <span>JSON</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white border-opacity-15 bg-slate-900 bg-white/2.5 dark:border-b-white/5 dark:bg-white/1">
        <div>
          <Code html={exampleJsonHtml} />
        </div>
      </div>
    </div>
  )
}
