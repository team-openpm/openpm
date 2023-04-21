'use server'

import {getUnrevokedApiKeys} from '@/server/db/api-keys/getters'

import {ApiKeyItem} from './api-key-item'
import {NewApiKey} from './new-api-key'

export async function ApiKeys({userId}: {userId: string}) {
  const apiKeys = await getUnrevokedApiKeys({userId})

  return (
    <div>
      <ul>
        {apiKeys.map((apiKey) => (
          <ApiKeyItem key={apiKey.id} apiKey={apiKey} />
        ))}
      </ul>

      <footer className="mt-5">
        <NewApiKey />
      </footer>
    </div>
  )
}
