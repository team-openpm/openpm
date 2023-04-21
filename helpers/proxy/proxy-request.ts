import {assert, assertString} from '@/lib/assert'
import {OpenApiDocument} from '@/lib/openapi/document'
import {OpenAPI} from '@/lib/openapi/types'
import {Package} from '@/server/db/packages/types'
import {getConnectionForPackageAndUser} from '@/server/db/user-connections/getters'

export class ProxyRequest {
  request: Request
  package: Package
  document: OpenApiDocument
  method: OpenAPI.HttpMethods
  path: string
  userId: string

  constructor({
    method,
    request,
    path,
    package: pkg,
    document,
    userId,
  }: {
    method: OpenAPI.HttpMethods
    path: string
    request: Request
    package: Package
    document: OpenApiDocument
    userId: string
  }) {
    this.method = method
    this.path = path
    this.request = request
    this.package = pkg
    this.document = document
    this.userId = userId
  }

  async fetch() {
    console.log(`Proxying ${this.method} ${this.path} to ${this.proxyUrl}`)

    const headers = await this.getProxyHeaders()

    return fetch(this.proxyUrl, {
      method: this.method,
      headers,
      body: this.proxyBody,
    })
  }

  get endpoint() {
    return this.document.endpoints.find((endpoint) => endpoint.path === this.path)
  }

  get requestUrl() {
    return new URL(this.request.url)
  }

  get requestSearchParams() {
    return this.requestUrl.searchParams
  }

  get proxyUrl() {
    const endpoint = this.endpoint
    assert(endpoint)
    assertString(endpoint.origin, 'endpoint.origin')

    const proxyUrl = new URL(endpoint.origin + endpoint.path)
    proxyUrl.search = this.requestSearchParams.toString()

    return proxyUrl
  }

  get proxyBody() {
    return this.request.body
  }

  async getProxyHeaders() {
    const validHeaders = ['content-type', 'accept']

    const headers = new Headers()

    for (const [key, value] of this.request.headers) {
      if (validHeaders.includes(key.toLowerCase())) {
        headers.set(key, value)
      }
    }

    for (const [key, value] of await this.getAuthHeaders()) {
      headers.set(key, value)
    }

    return headers
  }

  async getAuthHeaders() {
    const headers = new Headers()
    const connection = await this.userConnection

    if (!connection) {
      return headers
    }

    if (connection.api_key) {
      headers.set('Authorization', `Bearer ${connection.api_key}`)
    } else if (connection.access_token) {
      headers.set('Authorization', `Bearer ${connection.access_token}`)
    }

    return headers
  }

  get userConnection() {
    return getConnectionForPackageAndUser({
      userId: this.userId,
      packageId: this.package.id,
    })
  }
}
