'use client'

import {register} from '@teamhanko/hanko-elements'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect} from 'react'

import {assertString} from '@/lib/assert'

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL

export default function AccountAuth() {
  assertString(hankoApiUrl, 'Hanko API URL is not defined.')
  const router = useRouter()

  const redirectAfterLogin = useCallback(() => {
    router.replace('/auth/complete')
  }, [router])

  useEffect(() => {
    window.document.addEventListener('hankoAuthSuccess', redirectAfterLogin)
    return () =>
      window.document.removeEventListener('hankoAuthSuccess', redirectAfterLogin)
  }, [redirectAfterLogin])

  useEffect(() => {
    // register the component
    // see: https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register({shadow: true})
  }, [])

  return <hanko-auth api={hankoApiUrl} />
}
