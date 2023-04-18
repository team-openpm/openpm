import {memoize} from '@/lib/lodash-memoize'

import {OpenAPI} from './types'
import {schemaAsJson} from './utils'

export class OpenApiResponseExample {
  schema: OpenAPI.SchemaObject

  constructor({schema}: {schema: OpenAPI.SchemaObject}) {
    this.schema = schema
  }

  @memoize()
  get exampleJson(): string | null {
    if (this.schema.example) {
      return JSON.stringify(this.schema.example)
    }

    const json = schemaAsJson(this.schema)

    if (json) {
      return JSON.stringify(json, null, 2)
    }

    return null
  }
}
