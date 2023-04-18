import {db} from '../connection'

export async function updatePackage(
  packageId: string,
  {
    name,
    machineName,
    domain,
    contactEmail,
    legalInfoUrl,
    logoUrl,
    description,
    machineDescription,
  }: {
    name: string | null
    machineName: string | null
    domain: string
    contactEmail: string | null
    legalInfoUrl: string | null
    logoUrl: string | null
    description: string | null
    machineDescription: string | null
  },
) {
  await db
    .updateTable('packages')
    .set({
      name,
      machine_name: machineName,
      domain,
      contact_email: contactEmail,
      legal_info_url: legalInfoUrl,
      logo_url: logoUrl,
      description,
      machine_description: machineDescription,
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
