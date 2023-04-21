import {OpenApiSchema} from './schema'
import {OpenAPI} from './types'

export class OpenApiResponse {
  statusCode: string
  private responseObject: OpenAPI.ResponseObject

  constructor(statusCode: string, responseObject: OpenAPI.ResponseObject) {
    this.statusCode = statusCode
    this.responseObject = responseObject
  }

  get description(): string {
    return this.responseObject.description ?? ''
  }

  get schema() {
    const result = this.responseObject?.content?.['application/json']?.schema
    return result ? new OpenApiSchema(result) : null
  }
}
