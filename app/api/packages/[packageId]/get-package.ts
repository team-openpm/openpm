import {NextResponse} from 'next/server'

import {buildPackageResponse} from '@/helpers/api/package-response'
import {getFullPackageById} from '@/server/db/packages/getters'
import {error} from '@/server/helpers/error'

// Retrive a package

async function endpoint(
  request: Request,
  {
    params,
  }: {
    params: {packageId: string}
  },
) {
  const {searchParams} = new URL(request.url)
  const proxy = searchParams.get('proxy') === 'true'
  const pkg = await getFullPackageById(params.packageId)

  if (!pkg) {
    return error('Package not found', 'not_found', 404)
  }

  const response = await buildPackageResponse(pkg, {proxy})

  return NextResponse.json(response)
}

export default endpoint
