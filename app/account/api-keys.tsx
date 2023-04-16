'use server'

import {getUnrevokedApiKeys} from '@/server/db/api-keys/getters'

import {ApiKeyItem} from './api-key-item'
import {NewApiKey} from './new-api-key'

export async function ApiKeys({userId}: {userId: string}) {
  const apiKeys = await getUnrevokedApiKeys({userId})

  return (
    <section className="space-y-3" id="api-keys">
      <h2 className="text-base font-medium">API Keys</h2>
      <ul>
        {apiKeys.map((apiKey) => (
          <ApiKeyItem key={apiKey.id} apiKey={apiKey} />
        ))}
      </ul>

      <footer className="mt-5">
        <NewApiKey />
      </footer>
    </section>
  )
}
