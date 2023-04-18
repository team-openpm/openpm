'use client'

import Link from 'next/link'
import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

import {Package} from '@/server/db/packages/types'

import {DefaultButton} from '../buttons/default-button'
import {TextInput} from '../text-input'
import {TextareaInput} from '../textarea-input'

export default function EditPackageForm({package: pkg}: {package: Package}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [newPackage, setNewPackage] = useState<Partial<Package>>({
    ...pkg,
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (loading) {
      return
    }

    setLoading(true)

    const response = await fetch(`/api/packages/${pkg.id}`, {
      method: 'PUT',
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
    router.push(`/packages/${id}`)
  }

  const deletePackage = async () => {
    const response = await fetch(`/api/packages/${pkg.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const {error} = await response.json()
      alert(error?.message ?? 'Something went wrong')
      return
    }

    router.push(`/account`)
  }

  const confirmDeletePackage = () => {
    if (confirm('Are you sure you want to delete this package?')) {
      deletePackage()
    }
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
            <h2 className="text-xl font-semibold leading-7 text-slate-900">
              Edit package
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="Package id"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Package ID
                </label>

                <div className="mt-2">
                  <div className="flex justify-between">
                    <span className="font-mono">{pkg.id}</span>{' '}
                    <Link href={`/packages/${pkg.id}`} className="text-blue-500">
                      view package
                    </Link>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Package name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Name
                </label>

                <div className="mt-2">
                  <TextInput
                    name="Package name"
                    placeholder="A human readable name"
                    value={newPackage.name ?? ''}
                    onChange={(value) => setNewPackageKey('name', value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Machine name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Name for machines
                </label>

                <div className="mt-2">
                  <TextInput
                    name="Machine name"
                    placeholder="A machine readable name"
                    value={newPackage.machine_name ?? ''}
                    onChange={(value) => setNewPackageKey('machine_name', value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Package description"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Description
                </label>

                <div className="mt-2">
                  <TextareaInput
                    name="Package description"
                    placeholder="Describe your package in all its gory details"
                    value={newPackage.description ?? ''}
                    onChange={(value) => setNewPackageKey('description', value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Machine description"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Description for machines
                </label>

                <div className="mt-2">
                  <TextareaInput
                    name="Machine description"
                    placeholder="Describe your package for an AI"
                    value={newPackage.machine_description ?? ''}
                    onChange={(value) => setNewPackageKey('machine_description', value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Logo url"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Logo url
                </label>

                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1">
                    <TextInput
                      type="url"
                      name="Logo url"
                      placeholder="Typically your company logo"
                      value={newPackage.logo_url ?? ''}
                      onChange={(value) => setNewPackageKey('logo_url', value)}
                    />
                  </div>

                  <div className="relative h-10 w-10 flex-none overflow-hidden rounded-md bg-slate-900/50">
                    <div
                      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                      style={{backgroundImage: `url(${newPackage.logo_url})`}}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Contact email"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Contact email
                </label>

                <div className="mt-2">
                  <TextInput
                    type="email"
                    name="Contact email"
                    placeholder="support@example.com"
                    value={newPackage.contact_email ?? ''}
                    onChange={(value) => setNewPackageKey('contact_email', value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Legal info url"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Legal info url
                </label>

                <div className="mt-2">
                  <TextInput
                    type="url"
                    name="Legal info url"
                    placeholder="https://example.com/terms"
                    value={newPackage.legal_info_url ?? ''}
                    onChange={(value) => setNewPackageKey('legal_info_url', value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="openapi"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Latest OpenAPI JSON Spec
                </label>

                <div className="mt-2">
                  <TextareaInput
                    name="openapi"
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

        <div className="mt-6 flex items-center justify-between gap-x-6">
          <div>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-red-600"
              onClick={() => confirmDeletePackage()}
            >
              Delete package
            </button>
          </div>

          <div className="flex items-center gap-x-6">
            <a
              href="/packages"
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
