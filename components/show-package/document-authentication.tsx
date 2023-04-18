import {OpenApiDocument} from '@/lib/openapi/document'

import {DocumentSecurityScheme} from './document-security-schema'

export function DocumentAuthentication({document}: {document: OpenApiDocument}) {
  if (document.securitySchemes.size === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">Authentication</h2>

      <div className="space-y-3">
        {Array.from(document.securitySchemes).map(([name, scheme]) => (
          <DocumentSecurityScheme key={name} scheme={scheme} />
        ))}
      </div>
    </div>
  )
}
