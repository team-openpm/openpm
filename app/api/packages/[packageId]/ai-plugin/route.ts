import {NextResponse} from 'next/server'

import {packageToAiPlugin} from '@/helpers/ai-plugin/helpers'
import {getPackageById} from '@/server/db/packages/getters'
import {error} from '@/server/helpers/error'

// Retrive a package manifest
export async function GET(req: Request, {params}: {params: {packageId: string}}) {
  const pkg = await getPackageById(params.packageId)

  if (!pkg) {
    return error('Package not found', 'not_found', 404)
  }

  return NextResponse.json(packageToAiPlugin(pkg))
}
