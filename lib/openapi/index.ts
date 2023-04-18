import OpenAPIParser from '@readme/openapi-parser'
import {parse as parseYaml} from 'yaml'

import {OpenApiDocument} from './document'
import {OpenAPIV3, OpenAPIV3_1} from './types'

export async function parseSpecObject(spec: any): Promise<OpenApiDocument> {
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
  const specObject = JSON.parse(spec)
  return parseSpecObject(specObject)
}

export async function parseSpecYaml(spec: string): Promise<OpenApiDocument> {
  const specObject = await parseYaml(spec)
  return parseSpecObject(specObject)
}

export async function parseSpec(
  spec: string,
  format: 'json' | 'yaml',
): Promise<OpenApiDocument> {
  if (format === 'json') {
    return parseSpecJson(spec)
  } else {
    return parseSpecYaml(spec)
  }
}
