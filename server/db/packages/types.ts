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

// Typically we would never respond to the client with the full Package
export type PackageFull = Omit<Package, 'acl_write'>

// Everything in Package except openapi and acl_write
export type PackageLite = Omit<Package, 'openapi' | 'acl_write'>

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
