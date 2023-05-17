import {NextResponse} from 'next/server'

import {highlight} from '@/lib/code-highlighter'
import {parseJsonSpec} from '@/helpers/openapi'
import {getFullPackageById} from '@/server/db/packages/getters'
import {error} from '@/server/helpers/error'
import {getParams} from '@/server/helpers/params'

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {packageId: string}
  },
) {
  const pkg = await getFullPackageById(params.packageId)

  if (!pkg) {
    return error('Package not found', 'not_found', 404)
  }

  const doc = await parseJsonSpec(pkg.openapi)

  const path = getParams(req).get('path')

  const endpoint = doc.endpoints.find((endpoint) => endpoint.path === path)

  if (!endpoint) {
    return error('Endpoint not found', 'not_found', 404)
  }

  const requestExample = endpoint.requestExample
  const responseExample = endpoint.responseExample

  const [
    requestExampleCurl,
    requestExampleJavaScript,
    requestExamplePython,
    responseExampleJson,
  ] = await Promise.all([
    highlight(requestExample.exampleCurl, 'shellscript'),
    highlight(requestExample.exampleJavaScript, 'javascript'),
    highlight(requestExample.examplePython, 'python'),
    responseExample?.exampleJson
      ? highlight(responseExample.exampleJson, 'shellscript')
      : null,
  ])

  return NextResponse.json(
    {
      requestExampleCurl,
      requestExampleJavaScript,
      requestExamplePython,
      responseExampleJson,
    },
    {
      headers: {
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
    },
  )
}
