import first from 'lodash/first'
import {NextResponse} from 'next/server'
import semver from 'semver'
import {z} from 'zod'

import {parseSpecJson} from '@/lib/openapi'
import {getPackageById} from '@/server/db/packages/getters'
import {createPackage} from '@/server/db/packages/setters'
import {getUserById} from '@/server/db/users/getters'
import {withApiBuilder} from '@/server/helpers/api-builder'
import {withAuth} from '@/server/helpers/auth'
import {error} from '@/server/helpers/error'

const ApiSchema = z.object({
  openapi: z.string(),
  // Validate no spaces
  id: z.string().regex(/^[a-z0-9-]+$/),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

const createPackageEndpoint = withAuth(
  withApiBuilder<ApiRequestParams, {userId: string}>(
    ApiSchema,
    async (req: Request, {userId, data}) => {
      const userRow = await getUserById(userId)
      const packageRow = await getPackageById(data.id)

      if (packageRow) {
        return error('Package already exists')
      }

      const openapi = await parseSpecJson(data.openapi)
      const version = semver.valid(openapi.version)
      const domain = openapi.domain

      if (!openapi) {
        return error('Invalid openapi')
      }

      if (!version) {
        return error('Invalid version')
      }

      if (!domain) {
        return error('Missing openapi domain')
      }

      await createPackage({
        id: data.id,
        openapi: data.openapi,
        name: openapi.name || data.id,
        version,
        userId,
        domain,
        logoUrl: defaultLogo(domain),
        description: openapi.description,
        contactEmail: userRow ? first(userRow.emails) ?? null : null,
      })

      return NextResponse.json({
        id: data.id,
        version,
        openapi,
      })
    },
  ),
)

const defaultLogo = (domain: string) => `https://logo.clearbit.com/${domain}`

export default createPackageEndpoint
