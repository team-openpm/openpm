import {NextResponse} from 'next/server'
import {z} from 'zod'

import {packageToAiPlugin} from '@/helpers/ai-plugin/helpers'
import {searchPackages} from '@/server/db/packages/getters'
import {withApiBuilder} from '@/server/helpers/api-builder'

const ApiSchema = z.object({
  query: z.string(),
  limit: z.coerce.number().min(1).max(100).default(10),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

export const GET = withApiBuilder<ApiRequestParams>(
  ApiSchema,
  async (request: Request, {data}) => {
    const {query, limit} = data

    const packages = await searchPackages({query, limit})
    const plugins = packages.map((pkg) => packageToAiPlugin(pkg))

    return NextResponse.json(plugins, {
      headers: {
        'Cache-Control': 's-maxage=30, stale-while-revalidate=59',
      },
    })
  },
)
