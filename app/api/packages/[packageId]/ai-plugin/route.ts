import {NextResponse} from 'next/server'

import {packageToAiPlugin} from '@/helpers/ai-plugin/helpers'
import {getFullPackageById} from '@/server/db/packages/getters'
import {error} from '@/server/helpers/error'

// Retrive a package manifest
export async function GET(req: Request, {params}: {params: {packageId: string}}) {
  const pkg = await getFullPackageById(params.packageId)

  if (!pkg) {
    return error('Package not found', 'not_found', 404)
  }

  return NextResponse.json(packageToAiPlugin(pkg))
}
