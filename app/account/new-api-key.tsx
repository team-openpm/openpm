'use client'

import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

import {Modal} from '@/components/modal'

import {CreateApiKeyResponse} from '../api/api-keys/types'

export function NewApiKey() {
  const router = useRouter()
  const [apiKey, setApiKey] = useState<CreateApiKeyResponse | null>(null)

  const onCreateApiKey = async () => {
    const result = await fetch('/api/api-keys', {
      method: 'POST',
    })

    if (!result.ok) {
      alert('Failed to create API key')
      throw new Error('Failed to create API key')
    }

    const newApiKey = await result.json()
    setApiKey(newApiKey)

    router.refresh()
  }

  return (
    <section>
      <button type="button" onClick={onCreateApiKey} className="text-xs text-blue-500">
        New API key...
      </button>

      {apiKey && <NewApiKeyModal apiKey={apiKey.key} onClose={() => setApiKey(null)} />}
    </section>
  )
}

function NewApiKeyModal({apiKey, onClose}: {apiKey: string; onClose: () => void}) {
  return (
    <Modal title="New API Key" show={!!apiKey} onClose={onClose}>
      {apiKey && (
        <div className="space-y-5">
          <p>
            Here is your new API key. Be sure to copy it. This will be the last time that
            it is shown.
          </p>

          <pre>
            <code className="font-mono">{apiKey}</code>
          </pre>

          <footer className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Close
            </button>
          </footer>
        </div>
      )}
    </Modal>
  )
}
