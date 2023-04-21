import {OpenAPI} from './types'

import {parseJsonSpec} from '.'

const defaultServerUrl = 'https://openpm.ai/proxy'

interface ProxyOptions {
  document: OpenAPI.Document
  packageId: string
  proxyUrl?: string
}

/**
 * Rewrite an OpenAPI document for use with an API proxy.
 *
 * @param options - An object containing the original OpenAPI document, the ID of the package for which the proxy will be used, the URL of the proxy server (optional), and the API key for the proxy server.
 * @returns The modified OpenAPI document that is configured for use with the proxy.
 *
 * @remarks
 * This function performs the following steps to rewrite the document for use with the proxy:
 * 1. Rewrite all servers to use the proxy by deleting any existing servers and adding a new server with the specified URL.
 * 2. Remove all auth by deleting any existing security schemes and security definitions.
 * 3. Add proxy auth by adding a new security scheme and security definition for the proxy server.
 *
 * @example
 * ```
 * const originalDocument = // your OpenAPI document
 * const packageId = // your package ID
 * const proxyUrl = // your proxy server URL (optional)
 *
 * const modifiedDocument = rewriteDocumentForProxy({
 *   document: originalDocument,
 *   packageId,
 *   proxyUrl,
 * })
 * ```
 */
export function rewriteDocumentForProxy({
  document: original,
  packageId,
  proxyUrl,
}: ProxyOptions): OpenAPI.Document {
  // 1. Rewrite all servers to use the proxy
  // 2. Remove all auth
  // 3. Add proxy auth

  if (!proxyUrl) {
    // Default server url
    proxyUrl = `${defaultServerUrl}/${packageId}`
  }

  const document = cloneDocument(original)

  for (const pathObject of Object.values(document.paths ?? {})) {
    if (!pathObject) {
      continue
    }

    // Delete all sub servers
    if (pathObject.servers) {
      delete pathObject.servers
    }

    // Delete all method specific servers and security
    for (const method of Object.values(OpenAPI.HttpMethods)) {
      if (!pathObject[method]) {
        continue
      }

      const operationObject = pathObject[method]!

      if (operationObject.servers) {
        delete operationObject.servers
      }

      // Delete all auth
      if (operationObject.security) {
        delete operationObject.security
      }
    }
  }

  document.servers = [
    {
      url: proxyUrl,
    },
  ]

  if (!document.components) {
    document.components = {}
  }

  document.components.securitySchemes = {
    openpm_proxy: {
      type: 'http',
      scheme: 'bearer',
    },
  }

  document.security = [
    {
      openpm_proxy: [],
    },
  ]

  return document
}

export async function rewriteDocumentJsonForProxy({
  document,
  packageId,
  proxyUrl,
}: {
  document: string
  packageId: string
  proxyUrl?: string
}): Promise<string> {
  const originalDocument = await parseDocumentJson(document)
  const modifiedDocument = rewriteDocumentForProxy({
    document: originalDocument,
    packageId,
    proxyUrl,
  })

  return JSON.stringify(modifiedDocument)
}

// Returns a parsed OpenAPI document from a json string
async function parseDocumentJson(spec: string): Promise<OpenAPI.Document> {
  const doc = await parseJsonSpec(spec)
  return doc.document
}

function cloneDocument(original: OpenAPI.Document): OpenAPI.Document {
  return JSON.parse(JSON.stringify(original))
}
