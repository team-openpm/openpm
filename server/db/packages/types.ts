export interface Package {
  id: string
  name: string | null
  machine_name: string | null
  domain: string
  openapi: string
  version: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  published_at: Date
  logo_url: string | null
  contact_email: string | null
  legal_info_url: string | null
  description: string | null
  machine_description: string | null
  user_id: string
  acl_write: string[]
}

export type PackageFull = Omit<Package, 'acl_write'>

// Everything in Package except openapi and acl_write
// Convert Date to string for JSON serialization
export type PackageLite = Omit<
  Package,
  'openapi' | 'acl_write' | 'created_at' | 'updated_at' | 'published_at'
> & {
  created_at: string
  updated_at: string
  published_at: string
}
