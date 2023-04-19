'use server'

import {safeHighlight} from '@/lib/code-highlighter'
import {OpenApiRequestExample} from '@/lib/openapi/request-example'

import {DocumentEndpointRequestExampleTabs} from './document-endpoint-request-example-tabs'

export async function DocumentEndpointRequestExample({
  requestExample,
}: {
  requestExample: OpenApiRequestExample
}) {
  const [exampleCurlHtml, exampleJavaScriptHtml, examplePythonHtml] = await Promise.all([
    safeHighlight(requestExample.exampleCurl, 'shellscript'),
    safeHighlight(requestExample.exampleJavaScript, 'javascript'),
    safeHighlight(requestExample.examplePython, 'python'),
  ])

  return (
    <DocumentEndpointRequestExampleTabs
      exampleCurlHtml={exampleCurlHtml}
      exampleJavaScriptHtml={exampleJavaScriptHtml}
      examplePythonHtml={examplePythonHtml}
    />
  )
}
