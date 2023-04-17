import {NextResponse} from 'next/server'
import {z} from 'zod'

import {getPackagesWithPagination} from '@/server/db/packages/getters'
import {withApiBuilder} from '@/server/helpers/api-builder'

const ApiSchema = z.object({
  limit: z.number().min(1).max(500).default(100),
  page: z.number().min(1).default(1),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

// Paginated lists of packages

const endpoint = withApiBuilder<ApiRequestParams>(
  ApiSchema,
  async (request: Request, {data}) => {
    const {limit, page} = data

    const {results, total} = await getPackagesWithPagination({page, limit})

    return NextResponse.json({
      results,
      page,
      limit,
      total,
    })
  },
)

export default endpoint
