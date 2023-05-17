import type {ColumnType} from 'kysely'

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>

export type Json = ColumnType<JsonValue, string, string>

export type JsonArray = JsonValue[]

export type JsonObject = {
  [K in string]?: JsonValue
}

export type JsonPrimitive = boolean | null | number | string

export type JsonValue = JsonArray | JsonObject | JsonPrimitive

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface ApiKeys {
  id: Generated<string>
  user_id: string
  key: string
  created_at: Generated<Timestamp>
  revoked_at: Timestamp | null
}

export interface Packages {
  id: string
  name: string | null
  machine_name: string | null
  domain: string
  openapi: string
  version: string
  created_at: Generated<Timestamp>
  updated_at: Generated<Timestamp>
  deleted_at: Timestamp | null
  published_at: Generated<Timestamp>
  logo_url: string | null
  contact_email: string | null
  legal_info_url: string | null
  description: string | null
  machine_description: string | null
  user_id: string
  acl_write: Generated<string[]>
  oauth_client_id: string | null
  oauth_client_secret: string | null
  oauth_authorization_url: string | null
  oauth_token_url: string | null
}

export interface PackageVersions {
  version: string
  package_id: string
  openapi: string
  created_at: Generated<Timestamp>
}

export interface UserConnections {
  id: Generated<string>
  package_id: string
  user_id: string
  api_key: string | null
  access_token: string | null
  refresh_token: string | null
  expires_at: Timestamp | null
  updated_at: Generated<Timestamp>
  created_at: Generated<Timestamp>
}

export interface Users {
  id: Generated<string>
  emails: Generated<Json | null>
  last_sign_in_at: Timestamp | null
}

export interface DB {
  api_keys: ApiKeys
  package_versions: PackageVersions
  packages: Packages
  user_connections: UserConnections
  users: Users
}
