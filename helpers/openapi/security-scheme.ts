import {OpenAPI} from './types'

export class OpenApiSecurityScheme {
  name: string
  private securityScheme: OpenAPI.SecuritySchemeObject

  constructor(name: string, securityScheme: OpenAPI.SecuritySchemeObject) {
    this.name = name
    this.securityScheme = securityScheme
  }

  get description(): string {
    return this.securityScheme.description ?? ''
  }

  get type(): string {
    return this.securityScheme.type
  }
}
