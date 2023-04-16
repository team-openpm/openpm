import React from 'react'

import {Code} from '@/components/code'
import {highlight} from '@/lib/code-highlighter'
import {parseSpecJson} from '@/lib/openapi'
import {getPackageByIdOrNotFound} from '@/server/db/packages/getters'

export default async function PackageOpenApi({params}: {params: {packageId: string}}) {
  const pkg = await getPackageByIdOrNotFound(params.packageId)
  const doc = await parseSpecJson(pkg.openapi)

  const json = JSON.stringify(doc.toJSON(), null, 2)
  const jsonHighlighted = await highlight(json, 'json')

  return <Code html={jsonHighlighted} />
}
