'use client'

import {useRouter} from 'next/navigation'

import {RedactedApiKey} from '@/server/db/api-keys/types'

export function ApiKeyItem({apiKey}: {apiKey: RedactedApiKey}) {
  const router = useRouter()

  const onRevoke = async () => {
    if (!confirm('Are you sure you want to revoke this API key?')) {
      return
    }

    const response = await fetch(`/api/api-keys/${apiKey.id}/revoke`, {
      method: 'POST',
    })

    if (!response.ok) {
      const error = await response.json()
      alert(error.message ?? 'Unknown error')
      throw new Error(error.message ?? 'Unknown error')
    }

    router.refresh()
  }

  return (
    <li className="grid max-w-sm grid-cols-2">
      <span>
        <code className="font-mono text-sm">sk-...{apiKey.keyExcerpt}</code>
      </span>
      <span>
        <button
          type="button"
          onClick={onRevoke}
          className="text-xs font-medium text-red-500"
        >
          Revoke
        </button>
      </span>
    </li>
  )
}
