'use server'

import {highlight} from '@/lib/code-highlighter'
import {OpenApiRequestExample} from '@/lib/openapi/request-example'

import {DocumentEndpointRequestExampleTabs} from './document-endpoint-request-example-tabs'

export async function DocumentEndpointRequestExample({
  requestExample,
}: {
  requestExample: OpenApiRequestExample
}) {
  const [exampleCurlHtml, exampleJavaScriptHtml, examplePythonHtml] = await Promise.all([
    highlight(requestExample.exampleCurl, 'shellscript'),
    highlight(requestExample.exampleJavaScript, 'javascript'),
    highlight(requestExample.examplePython, 'python'),
  ])

  return (
    <DocumentEndpointRequestExampleTabs
      exampleCurlHtml={exampleCurlHtml}
      exampleJavaScriptHtml={exampleJavaScriptHtml}
      examplePythonHtml={examplePythonHtml}
    />
  )
}
