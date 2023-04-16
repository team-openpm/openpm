import {searchPackagesWithPagination} from '@/server/db/packages/getters'
import {getParams} from '@/server/helpers/params'

export async function GET(req: Request) {
  const params = getParams(req)
  const query = params.get('q')

  const packages = query ? await searchPackagesWithPagination({query, limit: 5}) : []

  return new Response(JSON.stringify(packages), {
    headers: {'Content-Type': 'application/x-suggestions+json'},
  })
}
