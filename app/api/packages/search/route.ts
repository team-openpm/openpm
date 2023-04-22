import {NextResponse} from 'next/server'
import {z} from 'zod'

import {buildPackageResponse} from '@/helpers/api/package-response'
import {searchPackages} from '@/server/db/packages/getters'
import {withApiBuilder} from '@/server/helpers/api-builder'

const ApiSchema = z.object({
  query: z.string(),
  limit: z.coerce.number().min(1).max(500).default(10),
  page: z.coerce.number().min(1).default(1),
  proxy: z.coerce.boolean().default(false),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

// Paginated lists of packages

export const GET = withApiBuilder<ApiRequestParams>(
  ApiSchema,
  async (request: Request, {data}) => {
    const {query, limit, proxy} = data

    const packages = await searchPackages({query, limit})

    return NextResponse.json(
      packages.map((pkg) => buildPackageResponse(pkg, {proxy})),
      {
        headers: {
          'Cache-Control': 's-maxage=30, stale-while-revalidate=59',
        },
      },
    )
  },
)
