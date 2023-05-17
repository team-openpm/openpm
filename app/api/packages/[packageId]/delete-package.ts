import {NextResponse} from 'next/server'

import {getFullPackageById} from '@/server/db/packages/getters'
import {deletePackage} from '@/server/db/packages/setters'
import {withAuth} from '@/server/helpers/auth'
import {error} from '@/server/helpers/error'

// Retrive a package

const endpoint = withAuth(
  async (
    req: Request,
    {params, userId}: {params: {packageId: string}; userId: string},
  ) => {
    const packageRow = await getFullPackageById(params.packageId)

    if (!packageRow) {
      return error('Package does not exist')
    }

    if (!packageRow.acl_write.includes(userId)) {
      return error('Unauthorized', 'unauthorized', 403)
    }

    await deletePackage(packageRow.id)

    return NextResponse.json({success: true})
  },
)

export default endpoint
