-- Postgres Schema for openpm's database

-- Drop tables

-- DROP TABLE IF EXISTS package_versions;
-- DROP TABLE IF EXISTS packages;
-- DROP TABLE IF EXISTS api_keys;
-- DROP TABLE IF EXISTS users;

-- Enable uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full text search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Table: users
-- Columns: emails, last_sign_in_at

CREATE TABLE users (
  -- uuid id
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Array of jsonb objects, default []
  emails JSONB DEFAULT '[]'::JSONB,

  -- UTC timestamp
  last_sign_in_at TIMESTAMP
);

-- Table: user_connections
-- Columns: package_id, user_id, api_key, access_token, refresh_token, expires_at, updated_at, created_at

CREATE TABLE user_connections (
  -- uuid id
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- String package_id
  package_id TEXT REFERENCES packages(id) ON DELETE CASCADE NOT NULL,

  -- uuid user_id
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,

  -- String api_key
  api_key TEXT,

  -- String access_token
  access_token TEXT,

  -- String refresh_token
  refresh_token TEXT,

  -- UTC timestamp
  expires_at TIMESTAMP,

  -- updated at
  updated_at TIMESTAMP DEFAULT now() NOT NULL,

  -- created at
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Table: api_keys
-- Columns: key, created_at, revoked_at, user_id

CREATE TABLE api_keys (
  -- uuid id
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- uuid user_id
  user_id UUID REFERENCES users(id) NOT NULL,

  -- String key
  key TEXT NOT NULL,

  -- UTC timestamp
  created_at TIMESTAMP DEFAULT now() NOT NULL,

  -- UTC timestamp
  revoked_at TIMESTAMP
);

-- Table: packages
-- Columns: name, machine_name, domain, openapi, version, created_at, updated_at, deleted_at, published_at, logo_url, contact_email, legal_info_url, description, machine_description, user_id, acl_write

CREATE TABLE packages (
  -- text id globaly unique
  id TEXT PRIMARY KEY,

  -- String name
  name TEXT,

  -- String machine_name
  machine_name TEXT,

  -- String domain
  domain TEXT NOT NULL,

  -- String openapi spec
  openapi TEXT NOT NULL,

  -- String version
  version TEXT NOT NULL,

  -- UTC timestamp
  created_at TIMESTAMP DEFAULT now() NOT NULL,

  -- UTC timestamp
  updated_at TIMESTAMP DEFAULT now() NOT NULL,

  -- UTC timestamp
  deleted_at TIMESTAMP,

  -- UTC timestamp
  published_at TIMESTAMP DEFAULT now() NOT NULL,

  -- String logo_url
  logo_url TEXT,

  -- String contact_email
  contact_email TEXT,

  -- String legal_info_url
  legal_info_url TEXT,

  -- String description, null allowed
  description TEXT,

  -- String machine_description
  machine_description TEXT,

  -- uuid user_id
  user_id UUID REFERENCES users(id) NOT NULL,

  -- Array of uuids, default [], references users(id)
  acl_write UUID[] DEFAULT '{}'::UUID[] NOT NULL,

  -- oauth client id
  oauth_client_id TEXT,

  -- oauth client secret
  oauth_client_secret TEXT

  -- oauth authorization uri
  oauth_authorization_url TEXT

  -- oauth redirect uri
  oauth_token_url TEXT
);

-- Sql to alter packages and add the columns oauth_client_id and oauth_client_secret, oauth_authorization_url, oauth_token_url
-- ALTER TABLE packages ADD COLUMN oauth_client_id TEXT;
-- ALTER TABLE packages ADD COLUMN oauth_client_secret TEXT;
-- ALTER TABLE packages ADD COLUMN oauth_authorization_url TEXT;
-- ALTER TABLE packages ADD COLUMN oauth_token_url TEXT;

-- Table: package_versions
-- Columns: openapi, version, created_at, package_id

CREATE TABLE package_versions (
  -- unique version
  version TEXT NOT NULL,

  UNIQUE(package_id, version),

  -- uuid package_id, cascade delete
  package_id TEXT REFERENCES packages(id) ON DELETE CASCADE NOT NULL,

  -- String openapi spec
  openapi TEXT NOT NULL,

  -- UTC timestamp
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Add indexes

-- Index: packages_name
CREATE INDEX packages_name ON packages USING GIN (name gin_trgm_ops);

-- Index: packages_machine_name
CREATE INDEX packages_machine_name ON packages USING GIN (name gin_trgm_ops);

-- Index: packages_domain
CREATE INDEX packages_domain ON packages USING GIN (domain gin_trgm_ops);

-- Index: packages machine description for full text search on machine_description
CREATE INDEX packages_machine_description ON packages USING GIN (machine_description gin_trgm_ops);

-- Index: users_emails
CREATE INDEX users_emails ON users USING GIN (emails);

-- Index: packages_user_id
CREATE INDEX packages_user_id ON packages (user_id);

-- Index: packages_acl_write
CREATE INDEX packages_acl_write ON packages USING GIN (acl_write);

-- Index: package_versions_package_id
CREATE INDEX package_versions_package_id ON package_versions (package_id);

-- Index: api_keys_user_id
CREATE INDEX api_keys_user_id ON api_keys (user_id);

-- Index: api_keys_key
CREATE INDEX api_keys_key ON api_keys (key);

-- Add a unique index where you can only have one connection per user/package
CREATE UNIQUE INDEX user_connections_user_id_package_id ON user_connections (user_id, package_id);
