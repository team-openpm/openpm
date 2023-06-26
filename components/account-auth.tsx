'use client'

import {Hanko, register} from '@teamhanko/hanko-elements'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

import {assertString} from '@/lib/assert'

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL

export default function AccountAuth({redirect = ''}: {redirect?: string}) {
  assertString(hankoApiUrl, 'Hanko API URL is not defined.')
  const router = useRouter()
  const [hanko, setHanko] = useState<Hanko>()

  const redirectAfterLogin = useCallback(() => {
    const url = new URL('/auth/complete', window.location.href)

    if (redirect) {
      url.searchParams.set('redirect', redirect)
    }

    router.replace(url.toString())
  }, [router, redirect])

  useEffect(() => {
    setHanko(new Hanko(hankoApiUrl))
  }, [])

  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(() => {
        redirectAfterLogin()
      }),
    [hanko, redirectAfterLogin],
  )

  useEffect(() => {
    // register the component
    // see: https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register(hankoApiUrl)
  }, [])

  return <hanko-auth />
}
