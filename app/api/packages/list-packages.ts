import {NextResponse} from 'next/server'
import {z} from 'zod'

import {
  getPackagesWithPagination,
  searchPackagesWithPagination,
} from '@/server/db/packages/getters'
import {withApiBuilder} from '@/server/helpers/api-builder'

const ApiSchema = z.object({
  query: z.string().nullable(),
  limit: z.number().min(1).max(500).default(100),
  page: z.number().min(1).default(1),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

// Paginated lists of packages

const endpoint = withApiBuilder<ApiRequestParams>(
  ApiSchema,
  async (request: Request, {data}) => {
    const {query, limit, page} = data

    const {packages, total} =  query
      ? await searchPackagesWithPagination({query, page, limit})
      : await getPackagesWithPagination({page, limit})

    return NextResponse.json({
      packages,
      page,
      limit,
      total,
    })
  },
)

export default endpoint
