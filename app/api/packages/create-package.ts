import first from 'lodash/first'
import {NextResponse} from 'next/server'
import {z} from 'zod'

import {parseSpec} from '@/helpers/openapi'
import {getFullPackageById} from '@/server/db/packages/getters'
import {createPackage} from '@/server/db/packages/setters'
import {getUserById} from '@/server/db/users/getters'
import {withApiBuilder} from '@/server/helpers/api-builder'
import {withAuth} from '@/server/helpers/auth'
import {error} from '@/server/helpers/error'

const ApiSchema = z.object({
  // Validate no spaces
  id: z.string().regex(/^[a-z0-9-]+$/),
  openapi: z.string(),
  openapi_format: z.enum(['json', 'yaml']).default('json'),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

const createPackageEndpoint = withAuth(
  withApiBuilder<ApiRequestParams, {userId: string}>(
    ApiSchema,
    async (req: Request, {userId, data}) => {
      const userRow = await getUserById(userId)
      const packageRow = await getFullPackageById(data.id)

      if (packageRow) {
        return error('Package already exists')
      }

      let doc

      try {
        doc = await parseSpec(data.openapi, data.openapi_format)
      } catch (err: any) {
        console.error(err)
        return error(`Invalid OpenAPI document: ${err?.message}`)
      }

      const version = doc.version

      if (typeof version !== 'string') {
        return error('Invalid OpenAPI version')
      }

      const domain = doc.domain

      if (!domain) {
        return error('Missing OpenAPI domain')
      }

      await createPackage({
        id: data.id,
        openapi: JSON.stringify(doc),
        name: doc.name || data.id,
        version,
        userId,
        domain,
        logoUrl: defaultLogo(domain),
        description: doc.description,
        contactEmail: userRow ? first(userRow.emails) ?? null : null,
      })

      return NextResponse.json({
        id: data.id,
        version,
        openapi: doc,
      })
    },
  ),
)

const defaultLogo = (domain: string) => `https://logo.clearbit.com/${domain}`

export default createPackageEndpoint
