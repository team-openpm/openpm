import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'
import {format as prettier} from 'prettier'

import {memoize} from '@/lib/lodash-memoize'
import {notEmpty} from '@/lib/not-empty'

import {OpenAPI} from './types'
import {schemaAsJson} from './utils'

export class OpenApiRequestExample {
  path: string
  method: OpenAPI.HttpMethods
  operation: OpenAPI.Operation
  servers: OpenAPI.ServerObject[]
  security: OpenAPI.SecurityRequirementObject[]
  securitySchemes: Record<string, OpenAPI.SecuritySchemeObject>

  constructor({
    servers,
    security,
    securitySchemes,
    path,
    method,
    operation,
  }: {
    servers: OpenAPI.ServerObject[]
    security: OpenAPI.SecurityRequirementObject[]
    securitySchemes: Record<string, OpenAPI.SecuritySchemeObject>
    path: string
    method: OpenAPI.HttpMethods
    operation: OpenAPI.Operation
  }) {
    this.servers = servers
    this.security = security
    this.securitySchemes = securitySchemes
    this.path = path
    this.method = method
    this.operation = operation
  }

  @memoize()
  get exampleCurl(): string {
    const lines: string[] = []

    const curlMethod = this.method !== 'get' ? ` -X ${this.uppercaseMethod}` : ''

    lines.push(`curl${curlMethod} '${this.origin}${this.path}${this.searchParamsQuery}'`)

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

  @memoize()
  get exampleJavaScript(): string {
    const fetchHeaders: Map<string, string> = this.authenticationHeaders
    const fetchOptions: Map<string, any> = new Map<string, any>()

    if (this.method !== 'get') {
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

  @memoize()
  get examplePython(): string {
    const headers = this.authenticationHeaders

    let result = `import requests\n\n`

    result += `requests.request('${this.method.toUpperCase()}', '${this.origin}${
      this.path
    }'`

    if (headers) {
      result += ',\n\theaders={\n'

      for (const [key, value] of headers) {
        result += `\t\t${JSON.stringify(key)}: ${JSON.stringify(value, null, 2)},\n`
      }

      result += '\t}'
    }

    if (this.properties) {
      result += ',\n\tjson={\n'

      for (const [key, value] of this.properties) {
        result += `\t\t${JSON.stringify(key)}: ${JSON.stringify(value, null, 2)},\n`
      }

      result += '\t}\n'
    }

    result += ')'

    return result
  }

  private get origin(): string {
    const server = first(this.servers)

    if (!server) {
      return ''
    }

    return server.url
  }

  private get uppercaseMethod(): string {
    return this.method.toUpperCase()
  }

  private get operationSecuritySchemes() {
    const securityReqs = [...this.security, ...(this.operation.security || [])]

    const securityTypes = securityReqs.map((security) => Object.keys(security)).flat()

    const schemes = securityTypes.map(
      (securityType) => this.securitySchemes[securityType],
    )

    return schemes.filter(notEmpty)
  }

  private get favoredSecurityScheme() {
    const schemes = this.operationSecuritySchemes

    // Sort schemes by type:
    //  first http
    //  then apiKey (only header)
    //  then oauth2

    const getSortIndex = (scheme: OpenAPI.SecuritySchemeObject) => {
      if (scheme.type === 'http') {
        return 0
      }

      if (scheme.type === 'apiKey' && scheme.in === 'header') {
        return 1
      }

      if (scheme.type === 'oauth2') {
        return 2
      }

      return 3
    }

    schemes.sort((a, b) => getSortIndex(a) - getSortIndex(b))

    return first(schemes)
  }

  private get authenticationHeaders(): Map<string, string> {
    const headers: Map<string, string> = new Map<string, string>()

    const scheme = this.favoredSecurityScheme

    if (!scheme) {
      return headers
    }

    if (scheme.type === 'oauth2') {
      headers.set('Authorization', `Bearer YOUR_ACCESS_TOKEN`)
    } else if (scheme.type === 'http' && scheme.scheme === 'bearer') {
      headers.set('Authorization', 'Bearer YOUR_API_KEY')
    } else if (scheme.type === 'http' && scheme.scheme === 'basic') {
      headers.set('Authorization', 'Basic YOUR_API_KEY')
    } else if (scheme.type === 'apiKey' && scheme.in === 'header') {
      headers.set(scheme.name ?? 'Authorization', 'YOUR_API_KEY')
    }

    return headers
  }

  private get authenticationSearchParams(): Map<string, string> {
    const params: Map<string, string> = new Map<string, string>()

    if (this.authenticationHeaders.size > 0) {
      return params
    }

    const scheme = this.favoredSecurityScheme

    if (!scheme) {
      return params
    }

    if (scheme.type === 'apiKey' && scheme.in === 'query') {
      params.set(scheme.name, 'YOUR_API_KEY')
    }

    return params
  }

  private get requestBodySchema() {
    return this.operation.requestBody?.content?.['application/json']?.schema ?? null
  }

  @memoize()
  private get properties() {
    const schema = this.requestBodySchema

    if (schema && !isEmpty(schema)) {
      return new Map(Object.entries(schemaAsJson(schema)))
    }

    return null
  }

  private get searchParams(): URLSearchParams {
    const params = new URLSearchParams()

    const authParams = this.authenticationSearchParams

    if (authParams.size > 0) {
      for (const [key, value] of authParams) {
        params.set(key, value)
      }
    }

    if (this.operation.parameters) {
      for (const param of this.operation.parameters) {
        if (param.in === 'query' && param.required) {
          params.set(param.name, param.example || 'value')
        }
      }
    }

    console.log(params.toString(), {authParams, d: this.operation.parameters})

    return params
  }

  private get searchParamsQuery(): string {
    const params = this.searchParams
    const queryString = params.toString()

    if (queryString) {
      return `?${queryString}`
    }

    return ''
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
