import OpenAPIParser from '@readme/openapi-parser'
import {parse as parseYaml} from 'yaml'

import {OpenApiDocument} from './document'
import {OpenAPIV3, OpenAPIV3_1} from './types'

export async function parseOpenApiObject(document: any): Promise<OpenApiDocument> {
  const version = document?.openapi ?? ''

  if (!version.startsWith('3.')) {
    throw new Error('Unsupported OpenAPI version')
  }

  // We need to clone the document because the parser will mutate it.
  const parsed = await OpenAPIParser.validate(clone(document))

  return new OpenApiDocument({
    parsed: parsed as OpenAPIV3.Document | OpenAPIV3_1.Document,
    document,
  })
}

export async function parseOpenApiSpecJson(spec: string): Promise<OpenApiDocument> {
  const specObject = JSON.parse(spec)
  return parseOpenApiObject(specObject)
}

export async function parseOpenSpecYaml(spec: string): Promise<OpenApiDocument> {
  const specObject = await parseYaml(spec)
  return parseOpenApiObject(specObject)
}

export async function parseOpenApiSpec(
  spec: string,
  format: 'json' | 'yaml',
): Promise<OpenApiDocument> {
  if (format === 'json') {
    return parseOpenApiSpecJson(spec)
  } else {
    return parseOpenSpecYaml(spec)
  }
}

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
