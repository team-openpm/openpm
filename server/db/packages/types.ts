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
  oauth_client_id: string | null
  oauth_client_secret: string | null
  oauth_authorize_url: string | null
  oauth_token_url: string | null
}

// Typically we would never respond to the client with the full Package
export type PackageFull = Omit<
  Package,
  'oauth_client_id' | 'oauth_client_secret' | 'oauth_authorize_url' | 'oauth_token_url'
>

// Everything in PackageFull except openapi and acl_write
export type PackageLite = Omit<PackageFull, 'openapi' | 'acl_write'>

type PackageFullKeys = keyof PackageFull

export const fullPackageCols: readonly PackageFullKeys[] = [
  'id',
  'name',
  'machine_name',
  'domain',
  'version',
  'created_at',
  'updated_at',
  'deleted_at',
  'published_at',
  'logo_url',
  'contact_email',
  'legal_info_url',
  'description',
  'machine_description',
  'user_id',
  'acl_write',
  'openapi',
] as const

type PackageLiteKeys = keyof PackageLite

export const litePackageCols: readonly PackageLiteKeys[] = [
  'id',
  'name',
  'machine_name',
  'domain',
  'version',
  'created_at',
  'updated_at',
  'deleted_at',
  'published_at',
  'logo_url',
  'contact_email',
  'legal_info_url',
  'description',
  'machine_description',
  'user_id',
] as const
