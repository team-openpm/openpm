'use client'

import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

import {jsonFetch} from '@/lib/json-fetch'
import {Package} from '@/server/db/packages/types'

import {DefaultButton} from '../buttons/default-button'
import {TextInput} from '../text-input'

export default function ConnectPackageForm({package: pkg}: {package: Package}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [apiKey, setApiKey] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (loading) {
      return
    }

    setLoading(true)

    const {error} = await jsonFetch(`/api/connections`, {
      method: 'POST',
      data: {api_key: apiKey, package_id: pkg.id},
    })

    if (error) {
      alert(error?.message)
      setLoading(false)
      return
    }

    router.push(`/account`)
  }

  return (
    <div className="flex w-full max-w-prose flex-col">
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-slate-900/5 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-slate-900">
              Connect to {pkg.name}
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="api_key"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  API Key
                </label>

                <div className="mt-2">
                  <TextInput
                    name="api_key"
                    placeholder="The api key for the package"
                    value={apiKey}
                    onChange={setApiKey}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-x-6">
          <div className="flex items-center gap-x-6">
            <a
              href={`/packages/${pkg.id}`}
              className="text-sm font-semibold leading-6 text-slate-900"
            >
              Cancel
            </a>

            <DefaultButton loading={loading}>Update package</DefaultButton>
          </div>
        </div>
      </form>
    </div>
  )
}
