'use client'

import {register} from '@teamhanko/hanko-elements'
import React, {useEffect} from 'react'

import {assertString} from '@/lib/assert'

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL

export default function AccountProfile() {
  assertString(hankoApiUrl, 'Hanko API URL is not defined.')

  useEffect(() => {
    // register the component
    // see: https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register(hankoApiUrl)
  }, [])

  return <hanko-profile />
}
