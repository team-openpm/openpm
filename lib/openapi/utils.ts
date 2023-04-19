import {OpenAPI} from './types'

export function safeParseUrl(url: string) {
  try {
    return new URL(url)
  } catch (err) {
    return null
  }
}

export function getDomain(document: OpenAPI.Document) {
  const baseUrl = getBaseUrl(document)
  const url = new URL(baseUrl ?? '')
  return url.hostname
}

export function getBaseUrl(document: OpenAPI.Document) {
  return document.servers?.[0]?.url ?? null
}

export function commonPrefix(paths: string[]): string {
  if (paths.length === 0) {
    return ''
  }

  // Sort the paths lexicographically
  paths = paths.slice().sort()

  // Compare the first and last path
  const firstPath = paths[0]
  const lastPath = paths[paths.length - 1]
  let prefix = ''

  // Iterate through the characters of the first and last path
  for (let i = 0; i < Math.min(firstPath.length, lastPath.length); i++) {
    if (firstPath[i] === lastPath[i]) {
      prefix += firstPath[i]
    } else {
      break
    }
  }

  // Check if the prefix is exactly the same as one of the paths
  if (paths.includes(prefix)) {
    return ''
  }

  return prefix
}

export const isArraySchemaObject = (
  schema: OpenAPI.SchemaObject,
): schema is OpenAPI.ArraySchemaObject => {
  return schema.type === 'array' && typeof schema.items === 'object'
}

export function schemaAsJson(schema: OpenAPI.SchemaObject): any {
  if (!schema) {
    return ''
  }

  switch (schema.type) {
    case 'object':
      return Object.fromEntries(
        Object.entries(schema.properties ?? {}).map(([key, value]) => [
          key,
          schemaAsJson(value),
        ]),
      )

    case 'array':
      return [schemaAsJson(schema.items)]
    case 'string':
      return schema.example ?? 'string'
    case 'number':
      return schema.example ?? 0
    case 'integer':
      return schema.example ?? 0
    case 'boolean':
      return schema.example ?? true
    case 'null':
      return null
    default:
      // Handle referenced schemas objects that might not have a type
      if (schema.properties) {
        return schemaAsJson({type: 'object', properties: schema.properties})
      }

      return schema.example ?? 'string'
  }
}
