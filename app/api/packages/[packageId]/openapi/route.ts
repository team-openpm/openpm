import {stringify as yamlStringify} from 'yaml'

import {parseJsonSpec} from '@/lib/openapi'
import {getPackageById} from '@/server/db/packages/getters'
import {error} from '@/server/helpers/error'
import {getParams} from '@/server/helpers/params'

// Retrive a package OpenAPI manifest
export async function GET(req: Request, {params}: {params: {packageId: string}}) {
  const extension = req.url.split('.').pop()
  const format = getParams(req).get('format') ?? extension ?? 'json'

  const pkg = await getPackageById(params.packageId)

  if (!pkg) {
    return error('Package not found', 'not_found', 404)
  }

  const doc = await parseJsonSpec(pkg.openapi)

  if (format === 'yaml') {
    return new Response(yamlStringify(doc), {
      headers: {
        'Content-Type': 'text/yaml',
      },
    })
  } else {
    return new Response(JSON.stringify(doc, null, 2), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
