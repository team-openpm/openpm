import OpenAPIParser from '@readme/openapi-parser'

import {OpenApiDocument} from './document'
import {OpenAPIV3, OpenAPIV3_1} from './types'

export async function parseSpec(spec: any): Promise<OpenApiDocument> {
  const document = await OpenAPIParser.parse(spec)
  const deferenced = await OpenAPIParser.dereference(document)

  const version = spec?.openapi ?? ''

  if (version.startsWith('3.1')) {
    return new OpenApiDocument(deferenced as OpenAPIV3_1.Document)
  } else if (version.startsWith('3.0')) {
    return new OpenApiDocument(deferenced as OpenAPIV3.Document)
  } else {
    throw new Error('Unsupported OpenAPI version')
  }
}

export async function parseSpecJson(spec: string): Promise<OpenApiDocument> {
  const specJson = JSON.parse(spec)
  return parseSpec(specJson)
}
