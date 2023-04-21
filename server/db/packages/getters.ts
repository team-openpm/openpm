import {notFound} from 'next/navigation'

import {Package, PackageFull, PackageLite} from './types'
import {db} from '../db'

export async function getPackageById(packageId: string): Promise<Package | null> {
  const pkg = await db
    .selectFrom('packages')
    .selectAll()
    .where('id', '=', packageId)
    .executeTakeFirst()

  if (!pkg) {
    return null
  }

  return pkg
}

export async function getPackagesByIds(packageIds: string[]): Promise<Package[]> {
  const pkgs = await db
    .selectFrom('packages')
    .selectAll()
    .where('id', 'in', packageIds)
    .execute()

  return pkgs
}

export async function getPackageByIdOrNotFound(packageId: string): Promise<Package> {
  const pkg = await getPackageById(packageId)

  if (!pkg) {
    notFound()
  }

  return pkg
}

export async function getPackageVersion({
  packageId,
  version,
}: {
  packageId: string
  version: string
}) {
  const pkg = await db
    .selectFrom('package_versions')
    .selectAll()
    .where('package_id', '=', packageId)
    .where('version', '=', version)
    .executeTakeFirst()

  if (!pkg) {
    return null
  }

  return pkg
}

export async function getPackageVersionOrNotFound({
  packageId,
  version,
}: {
  packageId: string
  version: string
}) {
  const pkg = await getPackageVersion({packageId, version})

  if (!pkg) {
    notFound()
  }

  return pkg
}

export async function searchPackages({
  query,
  limit,
}: {
  query: string
  limit: number
}): Promise<PackageFull[]> {
  return await db
    .selectFrom('packages')
    .select([
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
    ])
    .where(({or, cmpr}) =>
      or([
        cmpr('machine_name', 'like', `%${query}`),
        cmpr('machine_description', 'like', `%${query}%`),
      ]),
    )
    .orderBy('name', 'asc')
    .limit(limit)
    .execute()
}

export async function getPackagesWithIds(ids: string[]): Promise<PackageFull[]> {
  return db
    .selectFrom('packages')
    .where('id', 'in', ids)
    .select([
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
    ])
    .execute()
}

export async function searchPackagesWithPagination({
  query,
  page = 1,
  limit = 10,
}: {
  query: string
  page?: number
  limit?: number
}): Promise<{
  packages: PackageLite[]
  page: number
  limit: number
  total: number
}> {
  const packages = await db
    .selectFrom('packages')
    .select((eb) => [
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
      eb.fn.countAll().over().as('total_count'),
    ])
    .where(({or, cmpr}) =>
      or([cmpr('name', 'like', `%${query}`), cmpr('domain', 'like', `%${query}%`)]),
    )
    .orderBy('name', 'asc')
    .limit(limit)
    .offset((page - 1) * limit)
    .execute()

  const total = Number(packages[0]?.total_count ?? 0)

  return {
    packages,
    page,
    limit,
    total,
  }
}

export async function getPackagesWithPagination({
  page = 1,
  limit = 10,
  orderBy = 'id',
  orderDirection,
}: {
  page?: number
  limit?: number
  orderBy?: 'id' | 'name' | 'domain' | 'published_at'
  orderDirection?: 'asc' | 'desc'
}): Promise<{
  packages: PackageLite[]
  page: number
  limit: number
  total: number
}> {
  const packages = await db
    .selectFrom('packages')
    .select((eb) => [
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
      eb.fn.countAll().over().as('total_count'),
    ])
    .orderBy(orderBy, orderDirection)
    .limit(limit)
    .offset((page - 1) * limit)
    .execute()

  const total = Number(packages[0]?.total_count ?? 0)

  return {
    packages,
    page,
    limit,
    total,
  }
}

export async function getAllPackageIds() {
  return db.selectFrom('packages').select(['id']).execute()
}

export async function getAllPackages() {
  return db
    .selectFrom('packages')
    .select(['id', 'domain', 'openapi', 'version'])
    .orderBy('name', 'asc')
    .execute()
}

export async function getAllPackagesForUserId(userId: string) {
  return db
    .selectFrom('packages')
    .select(['id', 'domain', 'openapi', 'version'])
    .where('user_id', '=', userId)
    .orderBy('name', 'asc')
    .execute()
}

export async function getVersionsForPackageId(packageId: string) {
  return db
    .selectFrom('package_versions')
    .selectAll()
    .where('package_id', '=', packageId)
    .orderBy('created_at', 'desc')
    .execute()
}
