import {parseJsonSpec} from '@/lib/openapi'
import {getAllPackages} from '@/server/db/packages/getters'

async function main() {
  const packages = await getAllPackages()

  for (const pkg of packages) {
    console.log(`Validating ${pkg.id}`)
    try {
      await parseJsonSpec(pkg.openapi)
    } catch (err) {
      console.log(`Error validating ${pkg.id}`)
      console.log(err)
    }
  }
}

main()
