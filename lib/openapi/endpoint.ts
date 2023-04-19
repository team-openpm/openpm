import {OpenApiDocument} from './document'
import {OpenApiRequestExample} from './request-example'
import {OpenApiResponse} from './response'
import {OpenApiResponseExample} from './response-example'
import {OpenApiSchema} from './schema'
import {OpenAPI} from './types'

export class OpenApiEndpoint {
  path: string
  method: string
  private operationObject: OpenAPI.Operation
  private document: OpenApiDocument

  constructor({
    path,
    method,
    operationObject,
    document,
  }: {
    path: string
    method: string
    operationObject: OpenAPI.Operation
    document: OpenApiDocument
  }) {
    this.path = path
    this.method = method
    this.operationObject = operationObject
    this.document = document
  }

  get origin(): string | null {
    return this.operationObject.servers?.[0]?.url || this.document.origin
  }

  get description(): string {
    return this.operationObject.description ?? ''
  }

  get pathParameters(): OpenAPI.Parameter[] {
    return this.operationObject.parameters ?? []
  }

  get requestExample() {
    return new OpenApiRequestExample({
      origin: this.origin ?? '',
      path: this.path,
      method: this.method,
      operation: this.operationObject,
      document: this.document,
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
