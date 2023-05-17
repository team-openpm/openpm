import {NextResponse} from 'next/server'
import {z} from 'zod'

import {packageToAiPlugin} from '@/helpers/ai-plugin/helpers'
import {getPackagesWithIds} from '@/server/db/packages/getters'
import {withApiBuilder} from '@/server/helpers/api-builder'
import {error} from '@/server/helpers/error'

const ApiSchema = z.object({
  ids: z.string(),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

export const GET = withApiBuilder<ApiRequestParams>(
  ApiSchema,
  async (request: Request, {data}) => {
    const {ids: idsStr} = data
    const ids = idsStr.split(',')

    if (ids.length > 1000) {
      return error('Too many ids')
    }

    if (ids.length === 0) {
      return error('No ids')
    }

    const packages = await getPackagesWithIds(ids)
    const plugins = packages.map((pkg) => packageToAiPlugin(pkg))

    return NextResponse.json(plugins, {
      headers: {
        'Cache-Control': 's-maxage=30, stale-while-revalidate=59',
      },
    })
  },
)
