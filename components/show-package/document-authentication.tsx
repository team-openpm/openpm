import {OpenApiDocument} from '@/lib/openapi/document'

import {DocumentSecurityScheme} from './document-security-schema'

export function DocumentAuthentication({document}: {document: OpenApiDocument}) {
  if (!document.hasAuthentication) {
    return null
  }

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold" id="auth">
        Authentication
      </h2>

      <div className="space-y-3">
        {Object.entries(document.securitySchemes).map(([name, scheme]) => (
          <DocumentSecurityScheme key={name} scheme={scheme} />
        ))}
      </div>
    </div>
  )
}
