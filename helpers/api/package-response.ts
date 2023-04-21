import {PackageFull} from '@/server/db/packages/types'

import {rewriteDocumentJsonForProxy} from '../openapi/proxy'

interface PackageResponseOptions {
  proxyEnabled?: boolean
}

export async function buildPackageResponse(
  pkg: PackageFull,
  {proxyEnabled}: PackageResponseOptions = {
    proxyEnabled: false,
  },
) {
  let openapi = pkg.openapi

  if (proxyEnabled) {
    // If the proxy is enabled ensure the document's servers
    // and auth points to the proxy
    openapi = await rewriteDocumentJsonForProxy({
      document: openapi,
      packageId: pkg.id,
    })
  }

  return {
    id: pkg.id,
    domain: pkg.domain,
    openapi,
    name: pkg.name,
    machine_name: pkg.machine_name,
    version: pkg.version,
    user_id: pkg.user_id,
    logo_url: pkg.logo_url,
    contact_email: pkg.contact_email,
    description: pkg.description,
    machine_description: pkg.machine_description,
    legal_info_url: pkg.legal_info_url,
  }
}
