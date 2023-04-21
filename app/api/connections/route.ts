import {NextResponse} from 'next/server'
import {z} from 'zod'

import {parseJsonSpec} from '@/helpers/openapi'
import {getFullPackageById} from '@/server/db/packages/getters'
import {createUserConnection} from '@/server/db/user-connections/setters'
import {withApiBuilder} from '@/server/helpers/api-builder'
import {withAuth} from '@/server/helpers/auth'
import {error} from '@/server/helpers/error'

const ApiSchema = z.object({
  package_id: z.string(),
  api_key: z.string().nullable(),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

// Connects a user to a package

export const POST = withAuth(
  withApiBuilder<ApiRequestParams, {userId: string}>(
    ApiSchema,
    async (req: Request, {userId, data}) => {
      const packageRow = await getFullPackageById(data.package_id)

      if (!packageRow) {
        return error('Package does not exist')
      }

      const _doc = await parseJsonSpec(packageRow.openapi)

      // Todo - validate the spec against
      // the auth provided

      const connection = await createUserConnection({
        packageId: data.package_id,
        userId: userId,
        apiKey: data.api_key,
      })

      return NextResponse.json({
        id: connection.id,
      })
    },
  ),
)
