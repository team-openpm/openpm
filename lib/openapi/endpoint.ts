import {OpenApiRequestExample} from './request-example'
import {OpenApiResponse} from './response'
import {OpenApiResponseExample} from './response-example'
import {OpenApiSchema} from './schema'
import {OpenAPI} from './types'

export class OpenApiEndpoint {
  path: string
  method: string
  servers: OpenAPI.ServerObject[]
  securitySchemes: Record<string, OpenAPI.SecuritySchemeObject>
  operationObject: OpenAPI.Operation

  constructor({
    servers,
    securitySchemes,
    path,
    method,
    operationObject,
  }: {
    servers: OpenAPI.ServerObject[]
    securitySchemes: Record<string, OpenAPI.SecuritySchemeObject>
    path: string
    method: string
    operationObject: OpenAPI.Operation
  }) {
    this.servers = servers
    this.securitySchemes = securitySchemes
    this.path = path
    this.method = method
    this.operationObject = operationObject
  }

  get description(): string {
    return this.operationObject.description ?? ''
  }

  get pathParameters(): OpenAPI.Parameter[] {
    return this.operationObject.parameters ?? []
  }

  get combinedServers() {
    return (this.operationObject.servers ?? []).concat(this.servers)
  }

  get requestExample() {
    return new OpenApiRequestExample({
      securitySchemes: this.securitySchemes,
      servers: this.combinedServers,
      path: this.path,
      method: this.method,
      operation: this.operationObject,
    })
  }

  get bodySchema() {
    if (this.method === 'GET') {
      return null
    }

    const result = this.operationObject.requestBody?.content?.['application/json']?.schema
    return result ? new OpenApiSchema(result) : null
  }

  get responses() {
    if (!this.operationObject.responses) {
      return []
    }

    const results: OpenApiResponse[] = []

    for (const statusCode in this.operationObject.responses) {
      const responseObject = this.operationObject.responses[statusCode]!
      results.push(new OpenApiResponse(statusCode, responseObject))
    }

    return results
  }

  get successResponseSchema() {
    return (
      this.operationObject.responses?.['200']?.content?.['application/json']?.schema ??
      null
    )
  }

  get responseExample() {
    const schema = this.successResponseSchema

    if (!schema) {
      return null
    }

    return new OpenApiResponseExample({schema})
  }
}
