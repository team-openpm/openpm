import {ProxyRequest} from '@/helpers/proxy/proxy-request'
import {parseJsonSpec} from '@/lib/openapi'
import {OpenAPI} from '@/lib/openapi/types'
import {getPackageById} from '@/server/db/packages/getters'
import {withAuth} from '@/server/helpers/auth'
import {error} from '@/server/helpers/error'

interface ProxyOptions {
  params: {packageId: string; path: string[]}
  userId: string
}

function buildProxy(method: OpenAPI.HttpMethods) {
  return withAuth(async (request: Request, {params, userId}: ProxyOptions) => {
    const pkg = await getPackageById(params.packageId)

    if (!pkg) {
      return error('Package not found', 'package_not_found', 404)
    }

    const document = await parseJsonSpec(pkg.openapi)

    const path = `/${params.path.join('/')}`

    const proxyRequest = new ProxyRequest({
      method,
      path,
      request,
      package: pkg,
      document,
      userId,
    })

    if (!proxyRequest.endpoint) {
      return error('Endpoint not found', 'endpoint_not_found', 404)
    }

    return proxyRequest.fetch()
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
