import {MainTemplate} from '@/components/main-template'
import NewPackageForm from '@/components/new-package/new-package-form'
import {authOrRedirect} from '@/server/helpers/auth'

export default async function NewPackage() {
  await authOrRedirect()

  return (
    <MainTemplate>
      <NewPackageForm />
    </MainTemplate>
  )
}
