import {NextResponse} from 'next/server'

import {getPackageById} from '@/server/db/packages/getters'
import {error} from '@/server/helpers/error'

// Retrive a package manifest
export async function GET(req: Request, {params}: {params: {packageId: string}}) {
  const pkg = await getPackageById(params.packageId)

  if (!pkg) {
    return error('Package not found', 'not_found', 404)
  }

  // Manifest schema
  // {
  //   "schema_version": "v1",
  //   "name_for_human": "TODO Plugin",
  //   "name_for_model": "todo",
  //   "description_for_human": "Plugin for managing a TODO list. You can add, remove and view your TODOs.",
  //   "description_for_model": "Plugin for managing a TODO list. You can add, remove and view your TODOs.",
  //   "auth": {
  //     "type": "none"
  //   },
  //   "api": {
  //     "type": "openapi",
  //     "url": "http://localhost:3333/openapi.yaml",
  //     "is_user_authenticated": false
  //   },
  //   "logo_url": "http://localhost:3333/logo.png",
  //   "contact_email": "support@example.com",
  //   "legal_info_url": "http://www.example.com/legal"
  // }

  return NextResponse.json({
    schema_version: 'v1',
    name_for_human: pkg.name,
    name_for_model: pkg.machine_name,
    description_for_human: pkg.description,
    description_for_model: pkg.machine_description,
    auth: {
      type: 'none',
    },
    api: {
      type: 'openapi',
      url: `https://openpm.ai/packages/${pkg.id}/openapi.json`,
      is_user_authenticated: false,
    },
    logo_url: pkg.logo_url,
    contact_email: pkg.contact_email,
    legal_info_url: pkg.legal_info_url,
  })
}
