import {NextResponse} from 'next/server'
import {z} from 'zod'

import {searchPackagesWithPagination} from '@/server/db/packages/getters'
import {withApiBuilder} from '@/server/helpers/api-builder'

const ApiSchema = z.object({
  query: z.string(),
  limit: z.coerce.number().min(1).max(500).default(10),
  page: z.coerce.number().min(1).default(1),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

// Paginated lists of packages

export const GET = withApiBuilder<ApiRequestParams>(
  ApiSchema,
  async (request: Request, {data}) => {
    const {query, limit, page} = data

    const result = await searchPackagesWithPagination({query, limit, page})

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 's-maxage=30, stale-while-revalidate=59',
      },
    })
  },
)
