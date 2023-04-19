'use client'

import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

import {DefaultButton} from '@/components/buttons/default-button'
import {Select} from '@/components/select'
import {TextInput} from '@/components/text-input'
import {TextareaInput} from '@/components/textarea-input'
import {Package} from '@/server/db/packages/types'
import {safeJson} from '@/lib/response-json'

type PackageForm = Partial<Package> & {
  openapi_format?: string
}

export default function NewPackageForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [newPackage, setNewPackage] = useState<PackageForm>({})

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (loading) {
      return
    }

    setLoading(true)

    const response = await fetch('/api/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPackage),
    })

    if (!response.ok) {
      const {error} = (await safeJson(response)) ?? {}
      alert(error?.message ?? 'Something went wrong')
      setLoading(false)
      return
    }

    const {id} = await response.json()
    router.push(`/packages/${id}/edit`)
  }

  const setNewPackageKey = (key: keyof PackageForm, value: string) => {
    setNewPackage((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="flex w-full max-w-prose flex-col">
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-slate-900/5 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-slate-900 dark:text-white/90">
              New package
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="Package id"
                  className="block text-sm font-medium leading-6 text-slate-900 dark:text-white/80"
                >
                  Package ID
                </label>

                <div className="mt-2">
                  <TextInput
                    type="text"
                    name="Package id"
                    placeholder="Globally unique package id"
                    value={newPackage.id ?? ''}
                    onChange={(value) => setNewPackageKey('id', value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="spec"
                  className="block text-sm font-medium leading-6 text-slate-900 dark:text-white/80"
                >
                  OpenAPI JSON Spec
                </label>

                <div className="mt-2 space-y-2">
                  <Select
                    selectedValue={newPackage.openapi_format ?? 'json'}
                    onChange={(value) => setNewPackageKey('openapi_format', value)}
                    options={[
                      ['json', 'JSON'],
                      ['yaml', 'YAML'],
                    ]}
                  />

                  <TextareaInput
                    name="spec"
                    rows={5}
                    placeholder={`OpenAPI ${
                      newPackage.openapi_format === 'yaml' ? 'YAML' : 'JSON'
                    } Spec`}
                    value={newPackage.openapi ?? ''}
                    onChange={(value) => {
                      setNewPackageKey('openapi', value)
                    }}
                  />
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Paste in the OpenAPI{' '}
                  {newPackage.openapi_format === 'yaml' ? 'YAML' : 'JSON'} spec for your
                  package.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <a
            href="/packages"
            className="text-sm font-semibold leading-6 text-slate-900 dark:text-white/80"
          >
            Cancel
          </a>

          <DefaultButton loading={loading}>Create package</DefaultButton>
        </div>
      </form>
    </div>
  )
}
