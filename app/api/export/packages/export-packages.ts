import {NextResponse} from 'next/server'

import {getAllPackages} from '@/server/db/packages/getters'

async function exportPackages() {
  const packages = await getAllPackages()

  // Export packages as JSON

  return NextResponse.json(
    packages.map((pkg) => ({
      id: pkg.id,
      domain: pkg.domain,
      openapi: pkg.openapi,
    })),
  )
}

export default exportPackages
