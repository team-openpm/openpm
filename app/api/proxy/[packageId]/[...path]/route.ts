import {parseJsonSpec} from '@/lib/openapi'
import {OpenAPI} from '@/lib/openapi/types'
import {getPackageById} from '@/server/db/packages/getters'
import {getConnectionForPackageAndUser} from '@/server/db/user-connections/getters'
import {withAuth} from '@/server/helpers/auth'
import {error} from '@/server/helpers/error'

interface ProxyOptions {
  params: {packageId: string; path: string}
  userId: string
}

function buildProxy(method: OpenAPI.HttpMethods) {
  return withAuth(async (request: Request, {params, userId}: ProxyOptions) => {
    const pkg = await getPackageById(params.packageId)

    if (!pkg) {
      return error('Package not found', 'package_not_found', 404)
    }

    const doc = await parseJsonSpec(pkg.openapi)

    const endpoint = doc.endpoints.find((endpoint) => endpoint.path === params.path)

    if (!endpoint) {
      return error('Endpoint not found', 'endpoint_not_found', 404)
    }

    if (endpoint.method !== method) {
      return error('Method not allowed', 'method_not_allowed', 405)
    }

    const requestUrl = new URL(request.url)
    const requestSearchParams = requestUrl.searchParams

    const proxyUrl = new URL(doc.origin + endpoint.path)
    proxyUrl.search = requestSearchParams.toString()

    const connection = await getConnectionForPackageAndUser({
      userId,
      packageId: pkg.id,
    })

    console.log(connection)

    const response = await fetch(proxyUrl, {
      method: method,
      headers: request.headers,
      body: request.body,
    })

    return response
  })
}

export const GET = buildProxy(OpenAPI.HttpMethods.GET)
export const POST = buildProxy(OpenAPI.HttpMethods.POST)
export const PUT = buildProxy(OpenAPI.HttpMethods.PUT)
export const DELETE = buildProxy(OpenAPI.HttpMethods.DELETE)
export const PATCH = buildProxy(OpenAPI.HttpMethods.PATCH)
export const HEAD = buildProxy(OpenAPI.HttpMethods.HEAD)
export const OPTIONS = buildProxy(OpenAPI.HttpMethods.OPTIONS)
export const TRACE = buildProxy(OpenAPI.HttpMethods.TRACE)
