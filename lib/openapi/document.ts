import {first} from 'lodash'
import semver from 'semver'

import {memoize} from '@/lib/lodash-memoize'

import {OpenApiEndpoint} from './endpoint'
import {OpenAPI} from './types'
import {commonPrefix, safeParseUrl} from './utils'

export class OpenApiDocument {
  private document: OpenAPI.Document
  private original: OpenAPI.Document

  constructor({
    document,
    dereferenced,
  }: {
    document: OpenAPI.Document
    dereferenced: OpenAPI.Document
  }) {
    this.original = document
    this.document = dereferenced
  }

  toJSON() {
    return this.original
  }

  get name(): string | null {
    return this.document.info.title ?? null
  }

  get license(): string | null {
    return this.document.info.license?.name ?? null
  }

  @memoize()
  get allServerUrls(): string[] {
    const urls: string[] = []

    if (this.document.servers) {
      this.document.servers.map((server) => urls.push(server.url))
    }

    const paths = this.document.paths

    if (paths) {
      for (const pathObject of Object.values(paths)) {
        if (pathObject?.servers) {
          pathObject.servers.map((server) => urls.push(server.url))
        }
      }
    }

    return urls
  }

  @memoize()
  get domain(): string | null {
    const firstUrl = first(this.allServerUrls)

    if (!firstUrl) {
      return null
    }

    const url = safeParseUrl(firstUrl)
    return url?.hostname ?? null
  }

  get origin(): string | null {
    return this.document.servers?.[0]?.url ?? null
  }

  get description(): string | null {
    return this.document.info.description ?? null
  }

  @memoize()
  get version(): string | null {
    const value = this.document.info.version

    if (!value) {
      return null
    }

    return semver.valid(semver.coerce(value))
  }

  @memoize()
  get endpoints() {
    const results: OpenApiEndpoint[] = []

    for (const path in this.document.paths ?? {}) {
      const pathObject = this.document.paths![path]!

      if (pathObject.get) {
        results.push(
          new OpenApiEndpoint({
            path,
            method: 'GET',
            operationObject: pathObject.get,
            document: this,
          }),
        )
      }

      if (pathObject.post) {
        results.push(
          new OpenApiEndpoint({
            path,
            method: 'POST',
            operationObject: pathObject.post,
            document: this,
          }),
        )
      }

      if (pathObject.put) {
        results.push(
          new OpenApiEndpoint({
            path,
            method: 'PUT',
            operationObject: pathObject.put,
            document: this,
          }),
        )
      }

      if (pathObject.delete) {
        results.push(
          new OpenApiEndpoint({
            path,
            method: 'DELETE',
            operationObject: pathObject.delete,
            document: this,
          }),
        )
      }
    }

    return results
  }

  @memoize()
  get paths() {
    return this.endpoints.map((endpoint) => endpoint.path)
  }

  /**
   * Returns the common prefix of all paths, or null if there is no common prefix.
   * For example, if the endpoint paths are:
   *   /api/dogs
   *   /api/dogs/breeds
   *   /api/cats
   *   /api/cats/breeds
   *
   * This would return: "/api"
   *
   * But if the endpoint paths are:
   *  /dogs
   *  /dogs/breeds
   *
   *  This would return: null
   *  Because the prefix is exactly the same as one of the paths.
   */
  @memoize()
  get commonPathPrefix(): string | null {
    return commonPrefix(this.paths)
  }

  /**
   * A map of endpoints grouped by the first segment of their path.
   *
   * For example, if the endpoint paths are:
   *   /api/dogs
   *   /api/dogs/breeds
   *   /api/cats
   *   /api/cats/breeds
   *
   * This would return:
   *   dogs: [ ... ]
   *   cats: [ ... ]
   */
  @memoize()
  get groupedEndpoints(): Map<string, OpenApiEndpoint[]> {
    const results = new Map<string, OpenApiEndpoint[]>()

    const prefix = this.commonPathPrefix

    for (const endpoint of this.endpoints) {
      const path = prefix ? endpoint.path.slice(prefix.length) : endpoint.path
      const parts = path.split('/').filter(Boolean)
      const group = parts[0]

      if (!group) {
        continue
      }

      if (!results.has(group)) {
        results.set(group, [])
      }

      results.get(group)!.push(endpoint)
    }

    return results
  }

  @memoize()
  get securitySchemes() {
    const schemes = this.document.components?.securitySchemes

    // convert object to map
    const results = new Map<string, OpenAPI.SecuritySchemeObject>()

    for (const name in schemes ?? {}) {
      const scheme = schemes![name]!
      results.set(name, scheme)
    }

    return results
  }
}
