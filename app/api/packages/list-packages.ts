import {NextResponse} from 'next/server'
import {z} from 'zod'

import {getPackagesWithPagination} from '@/server/db/packages/getters'
import {withApiBuilder} from '@/server/helpers/api-builder'

const ApiSchema = z.object({
  limit: z.coerce.number().min(1).max(500).default(100),
  page: z.coerce.number().min(1).default(1),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

// Paginated lists of packages

const endpoint = withApiBuilder<ApiRequestParams>(
  ApiSchema,
  async (request: Request, {data}) => {
    const {limit, page} = data

    const {packages, total} = await getPackagesWithPagination({page, limit})

    return NextResponse.json(
      {
        items: packages,
        page,
        limit,
        total,
      },
      {
        headers: {
          'Cache-Control': 's-maxage=30, stale-while-revalidate=59',
        },
      },
    )
  },
)

export default endpoint
