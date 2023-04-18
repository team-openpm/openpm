'use client'

import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

import {Package} from '@/server/db/packages/types'

import {DefaultButton} from '../buttons/default-button'
import {TextInput} from '../text-input'
import {TextareaInput} from '../textarea-input'

export default function NewPackageForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [newPackage, setNewPackage] = useState<Partial<Package>>({})

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
      const {error} = await response.json()
      alert(error?.message ?? 'Something went wrong')
      setLoading(false)
      return
    }

    const {id} = await response.json()
    router.push(`/packages/${id}/edit`)
  }

  const setNewPackageKey = (key: keyof Package, value: string) => {
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

                <div className="mt-2">
                  <TextareaInput
                    name="spec"
                    rows={5}
                    placeholder="OpenApi JSON Spec"
                    value={newPackage.openapi ?? ''}
                    onChange={(value) => {
                      setNewPackageKey('openapi', value)
                    }}
                  />
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Paste in the OpenAPI JSON spec for your package.
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
