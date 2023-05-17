'use server'

import React from 'react'

import {Code} from '@/components/code'
import {parseJsonSpec} from '@/helpers/openapi'
import {highlight} from '@/lib/code-highlighter'
import {getPackageByIdOrNotFound} from '@/server/db/packages/getters'

export default async function PackageOpenApi({params}: {params: {packageId: string}}) {
  const pkg = await getPackageByIdOrNotFound(params.packageId)
  const doc = await parseJsonSpec(pkg.openapi)

  const json = JSON.stringify(doc, null, 2)
  const jsonHighlighted = await highlight(json, 'json')

  return <Code html={jsonHighlighted} />
}
