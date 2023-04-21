import first from 'lodash/first'

import {OpenApiRequestExample} from './request-example'
import {OpenApiResponse} from './response'
import {OpenApiResponseExample} from './response-example'
import {OpenApiSchema} from './schema'
import {OpenAPI} from './types'

export class OpenApiEndpoint {
  path: string
  method: OpenAPI.HttpMethods
  servers: OpenAPI.ServerObject[]
  security: OpenAPI.SecurityRequirementObject[]
  securitySchemes: Record<string, OpenAPI.SecuritySchemeObject>
  operation: OpenAPI.Operation

  constructor({
    servers,
    securitySchemes,
    path,
    method,
    security,
    operation,
  }: {
    servers: OpenAPI.ServerObject[]
    securitySchemes: Record<string, OpenAPI.SecuritySchemeObject>
    path: string
    method: OpenAPI.HttpMethods
    security: OpenAPI.SecurityRequirementObject[]
    operation: OpenAPI.Operation
  }) {
    this.servers = servers
    this.securitySchemes = securitySchemes
    this.path = path
    this.method = method
    this.operation = operation
    this.security = security
  }

  get description(): string {
    return this.operation.description ?? ''
  }

  get pathParameters(): OpenAPI.Parameter[] {
    return this.operation.parameters ?? []
  }

  get combinedServers() {
    return (this.operation.servers ?? []).concat(this.servers)
  }

  get origin() {
    const url = first(this.combinedServers)?.url

    if (!url) {
      return null
    }

    // Strip trailing slash
    return url.replace(/\/$/, '')
  }

  get requestExample() {
    return new OpenApiRequestExample({
      security: this.security,
      securitySchemes: this.securitySchemes,
      servers: this.combinedServers,
      path: this.path,
      method: this.method,
      operation: this.operation,
    })
  }

  get bodySchema() {
    if (this.method === 'get') {
      return null
    }

    const result = this.operation.requestBody?.content?.['application/json']?.schema
    return result ? new OpenApiSchema(result) : null
  }

  get responses() {
    if (!this.operation.responses) {
      return []
    }

    const results: OpenApiResponse[] = []

    for (const statusCode in this.operation.responses) {
      const responseObject = this.operation.responses[statusCode]!
      results.push(new OpenApiResponse(statusCode, responseObject))
    }

    return results
  }

  get successResponseSchema() {
    return (
      this.operation.responses?.['200']?.content?.['application/json']?.schema ?? null
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
