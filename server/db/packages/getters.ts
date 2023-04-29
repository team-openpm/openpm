import {notFound} from 'next/navigation'

import {
  Package,
  FullPackage,
  LitePackage,
  fullPackageCols,
  litePackageCols,
} from './types'
import {db} from '../db'

export async function getUnsafePackageById(packageId: string): Promise<Package | null> {
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

export async function getFullPackageById(packageId: string): Promise<FullPackage | null> {
  const pkg = await db
    .selectFrom('packages')
    .select(fullPackageCols)
    .where('id', '=', packageId)
    .executeTakeFirst()

  if (!pkg) {
    return null
  }

  return pkg
}

export async function getFullPackagesByIds(packageIds: string[]): Promise<FullPackage[]> {
  const pkgs = await db
    .selectFrom('packages')
    .select(fullPackageCols)
    .where('id', 'in', packageIds)
    .execute()

  return pkgs
}

export async function getPackageByIdOrNotFound(packageId: string): Promise<FullPackage> {
  const pkg = await getFullPackageById(packageId)

  if (!pkg) {
    notFound()
  }

  return pkg
}

// This returns the full package - including the
// oauth credentials. It's important that this is only
// requested by the package owner.
export async function getPackageForEditByUser({
  packageId,
  userId,
}: {
  packageId: string
  userId: string
}): Promise<Package | null> {
  return (
    (await db
      .selectFrom('packages')
      .selectAll()
      .where('id', '=', packageId)
      .where('user_id', '=', userId)
      .executeTakeFirst()) ?? null
  )
}

// This returns the full package - including the
// oauth credentials. It's important that this is only
// requested by the package owner.
export async function getPackageForEditByUserOrNotFound({
  packageId,
  userId,
}: {
  packageId: string
  userId: string
}): Promise<Package> {
  const pkg = await getPackageForEditByUser({packageId, userId})

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
}): Promise<FullPackage[]> {
  return await db
    .selectFrom('packages')
    .select(fullPackageCols)
    .where(({or, cmpr}) =>
      or([
        cmpr('id', 'ilike', `${query}%`),
        cmpr('name', 'ilike', `%${query}%`),
        cmpr('description', 'ilike', `%${query}%`),
      ]),
    )
    .orderBy('name', 'asc')
    .limit(limit)
    .execute()
}

export async function searchPackagesWithPagination({
  query,
  page = 1,
  limit = 10,
  orderBy = 'id',
  orderDirection,
}: {
  query: string
  page?: number
  limit?: number
  orderBy?: 'id' | 'name' | 'domain' | 'published_at'
  orderDirection?: 'asc' | 'desc'
}): Promise<{
  items: LitePackage[]
  page: number
  limit: number
  total: number
}> {
  const items = await db
    .selectFrom('packages')
    .where(({or, cmpr}) =>
      or([
        or([
          cmpr('id', 'ilike', `${query}%`),
          cmpr('name', 'ilike', `%${query}%`),
          cmpr('description', 'ilike', `%${query}%`),
        ]),
      ]),
    )
    .select((eb) => [...litePackageCols, eb.fn.countAll().over().as('total_count')])
    .orderBy(orderBy, orderDirection)
    .limit(limit)
    .offset((page - 1) * limit)
    .execute()

  const total = Number(items[0]?.total_count ?? 0)

  return {
    items,
    page,
    limit,
    total,
  }
}

export async function getPackagesWithIds(ids: string[]): Promise<FullPackage[]> {
  return db
    .selectFrom('packages')
    .where('id', 'in', ids)
    .select(fullPackageCols)
    .execute()
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
  items: LitePackage[]
  page: number
  limit: number
  total: number
}> {
  const items = await db
    .selectFrom('packages')
    .select((eb) => [...litePackageCols, eb.fn.countAll().over().as('total_count')])
    .orderBy(orderBy, orderDirection)
    .limit(limit)
    .offset((page - 1) * limit)
    .execute()

  const total = Number(items[0]?.total_count ?? 0)

  return {
    items,
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
