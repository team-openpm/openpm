import {Package} from './types'
import {db} from '../db'

type UpdatePackage = Pick<
  Package,
  | 'name'
  | 'machine_name'
  | 'domain'
  | 'logo_url'
  | 'contact_email'
  | 'legal_info_url'
  | 'description'
  | 'machine_description'
  | 'oauth_client_id'
  | 'oauth_client_secret'
  | 'oauth_authorization_url'
  | 'oauth_token_url'
>

export async function updatePackage(packageId: string, pkg: UpdatePackage) {
  await db
    .updateTable('packages')
    .set({
      name: pkg.name,
      machine_name: pkg.machine_name,
      domain: pkg.domain,
      logo_url: pkg.logo_url,
      contact_email: pkg.contact_email,
      legal_info_url: pkg.legal_info_url,
      description: pkg.description,
      machine_description: pkg.machine_description,
      oauth_client_id: pkg.oauth_client_id,
      oauth_client_secret: pkg.oauth_client_secret,
      oauth_authorization_url: pkg.oauth_authorization_url,
      oauth_token_url: pkg.oauth_token_url,
    })
    .where('id', '=', packageId)
    .executeTakeFirstOrThrow()
}

export async function updatePackageSpec({
  packageId,
  openapi,
  version,
}: {
  packageId: string
  openapi: string
  version: string
}) {
  // Create a new package version
  // Raise if the package version already exists
  // Use a transaction and create a new package version at the same time

  await db.transaction().execute(async (trx) => {
    await trx
      .updateTable('packages')
      .set({
        openapi,
        version,
        updated_at: new Date(),
        published_at: new Date(),
      })
      .where('id', '=', packageId)
      .executeTakeFirstOrThrow()

    await trx
      .insertInto('package_versions')
      .values({
        version,
        package_id: packageId,
        openapi,
      })
      .execute()
  })
}

export async function createPackage({
  id,
  openapi,
  name,
  version,
  userId,
  domain,
  contactEmail,
  logoUrl,
  description,
}: {
  id: string
  openapi: string
  name: string
  version: string
  userId: string
  domain: string
  contactEmail: string | null
  logoUrl: string | null
  description: string | null
}) {
  await db.transaction().execute(async (trx) => {
    await trx
      .insertInto('packages')
      .values({
        id,
        domain,
        name,
        machine_name: name,
        openapi,
        version,
        user_id: userId,
        acl_write: [userId],
        logo_url: logoUrl,
        contact_email: contactEmail,
        description: description,
        machine_description: description,
      })
      .execute()

    await trx
      .insertInto('package_versions')
      .values({
        version,
        package_id: id,
        openapi,
      })
      .execute()
  })
}

export async function deletePackage(packageId: string) {
  await db.deleteFrom('packages').where('id', '=', packageId).executeTakeFirstOrThrow()
}
