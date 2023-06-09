import {NextResponse} from 'next/server'
import semver from 'semver'
import {z} from 'zod'

import {parseSpec} from '@/helpers/openapi'
import {OpenApiDocument} from '@/helpers/openapi/document'
import {getFullPackageById} from '@/server/db/packages/getters'
import {updatePackage, updatePackageSpec} from '@/server/db/packages/setters'
import {withApiBuilder} from '@/server/helpers/api-builder'
import {withAuth} from '@/server/helpers/auth'
import {error} from '@/server/helpers/error'

const ApiSchema = z.object({
  packageId: z.string(),
  openapi: z.string().nullable(),
  openapi_format: z.enum(['json', 'yaml']).default('json'),
  name: z.string().nullable(),
  machine_name: z.string().nullable(),
  domain: z.string(),
  contact_email: z.string().nullable(),
  legal_info_url: z.string().nullable(),
  logo_url: z.string().nullable(),
  description: z.string().nullable(),
  machine_description: z.string().nullable(),
  oauth_client_id: z.string().nullable(),
  oauth_client_secret: z.string().nullable(),
  oauth_authorization_url: z.string().nullable(),
  oauth_token_url: z.string().nullable(),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

// Creates a new package version

const endpoint = withAuth(
  withApiBuilder<ApiRequestParams, {userId: string}>(
    ApiSchema,
    async (req: Request, {userId, data}) => {
      const packageRow = await getFullPackageById(data.packageId)

      if (!packageRow) {
        return error('Package does not exist')
      }

      if (!packageRow.acl_write.includes(userId)) {
        return error('Unauthorized', 'unauthorized', 403)
      }

      await updatePackage(data.packageId, data)

      if (data.openapi) {
        let doc: OpenApiDocument

        try {
          doc = await parseSpec(data.openapi, data.openapi_format)
        } catch (err: any) {
          return error(`Invalid OpenAPI document: ${err?.message}`)
        }

        const version = semver.valid(doc.version)

        if (!version) {
          return error('Invalid version')
        }

        if (semver.gt(version, packageRow.version)) {
          await updatePackageSpec({
            packageId: data.packageId,
            openapi: JSON.stringify(doc),
            version,
          })
        }
      }

      return NextResponse.json({
        id: packageRow.id,
      })
    },
  ),
)

export default endpoint
