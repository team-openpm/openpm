import isEmpty from 'lodash/isEmpty'
import {format as prettier} from 'prettier'

import {OpenApiDocument} from './document'
import {OpenAPI} from './types'
import {schemaAsJson} from './utils'

export class OpenApiRequestExample {
  path: string
  method: string
  operation: OpenAPI.Operation
  document: OpenApiDocument
  properties: Map<string, unknown> | null = null

  constructor({
    path,
    method,
    operation,
    document,
  }: {
    path: string
    method: string
    operation: OpenAPI.Operation
    document: OpenApiDocument
  }) {
    this.path = path
    this.method = method
    this.operation = operation
    this.document = document
    this.properties = this.requestBodySchemaAsMap
  }

  get origin(): string {
    return this.document.baseUrl ?? ''
  }

  get exampleCurl(): string {
    const lines: string[] = []

    lines.push(`curl -X ${this.uppercaseMethod} '${this.origin}${this.path}'`)

    if (this.authenticationHeaders) {
      for (const [key, value] of this.authenticationHeaders) {
        lines.push(`\t-H '${key}: ${value}'`)
      }
    }

    if (this.properties) {
      lines.push(`\t-H 'Content-Type: application/json'`)
      lines.push(`\t-d '${JSON.stringify(Object.fromEntries(this.properties))}'`)
    }

    return lines.join(' \\\n')
  }

  get exampleJavaScript(): string {
    const fetchHeaders: Map<string, string> = this.authenticationHeaders
    const fetchOptions: Map<string, any> = new Map<string, any>()

    if (this.uppercaseMethod !== 'GET') {
      fetchOptions.set('method', this.uppercaseMethod)
    }

    if (this.properties) {
      fetchHeaders.set('Content-Type', 'application/json')
    }

    if (fetchHeaders.size > 0) {
      // Ensure we set headers before we set body
      fetchOptions.set('headers', Object.fromEntries(fetchHeaders))
    }

    if (this.properties) {
      fetchOptions.set('body', Object.fromEntries(this.properties))
    }

    let js = `fetch('${this.origin}${this.path}'`

    if (fetchOptions.size > 0) {
      js += `, ${objectStringify(Object.fromEntries(fetchOptions), ['body'])}`
    }

    js += ')'

    return prettier(js, {semi: false, parser: 'babel', printWidth: 60})
  }

  get examplePython(): string {
    const headers = this.authenticationHeaders

    let result = `import requests\n\n`

    result += `requests.request('${this.method.toUpperCase()}', '${this.origin}${
      this.path
    }'`

    if (headers) {
      result += ',\n\theaders={\n'

      for (const [key, value] of headers) {
        result += `\t\t${key}: ${JSON.stringify(value, null, 2)},\n`
      }

      result += '\t}'
    }

    if (this.properties) {
      result += ',\n\tjson={\n'

      for (const [key, value] of this.properties) {
        result += `\t\t${key}: ${JSON.stringify(value, null, 2)},\n`
      }

      result += '\t}\n'
    }

    result += ')'

    return result
  }

  private get uppercaseMethod(): string {
    return this.method.toUpperCase()
  }

  private get security() {
    if (!this.operation.security) {
      return null
    }

    const [security] = this.operation.security
    const [securityType] = Object.keys(security)

    return this.document.securitySchemes.get(securityType)
  }

  private get authenticationHeaders(): Map<string, string> {
    const headers: Map<string, string> = new Map<string, string>()

    const securitySchema = this.security

    if (securitySchema?.type === 'oauth2') {
      headers.set('Authorization', `Bearer YOUR_ACCESS_TOKEN`)
    } else if (securitySchema?.type === 'http' && securitySchema.scheme === 'bearer') {
      headers.set('Authorization', 'Bearer YOUR_API_KEY')
    } else if (securitySchema?.type === 'http' && securitySchema.scheme === 'basic') {
      headers.set('Authorization', 'Basic YOUR_API_KEY')
    } else if (securitySchema?.type === 'apiKey') {
      headers.set(securitySchema.name ?? 'Authorization', 'YOUR_API_KEY')
    }

    return headers
  }

  private get requestBodySchema() {
    return this.operation?.requestBody?.content?.['application/json']?.schema ?? null
  }

  private get requestBodySchemaAsMap() {
    const schema = this.requestBodySchema

    if (schema && !isEmpty(schema)) {
      return new Map(Object.entries(schemaAsJson(schema)))
    }

    return null
  }
}

function objectStringify(
  obj: Record<string, any>,
  jsonStringifyKeys: string[] = [],
): string {
  let result = JSON.stringify(
    obj,
    (key, value) => {
      if (jsonStringifyKeys && jsonStringifyKeys.includes(key)) {
        return `__JSON_STRINGIFY_${key}__`
      } else {
        return value
      }
    },
    2,
  )

  if (jsonStringifyKeys.length > 0) {
    jsonStringifyKeys.forEach((jsonStringifyKey) => {
      if (obj[jsonStringifyKey]) {
        result = result.replaceAll(
          `"__JSON_STRINGIFY_${jsonStringifyKey}__"`,
          `JSON.stringify(${JSON.stringify(obj[jsonStringifyKey])})`,
        )
      }
    })
  }

  return result
}
