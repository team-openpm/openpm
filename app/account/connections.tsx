'use server'

import {getConnectionsForUser} from '@/server/db/user-connections/getters'

import {ConnectionItem} from './connection-item'

export async function Connections({userId}: {userId: string}) {
  const connections = await getConnectionsForUser(userId)

  return (
    <div>
      <ul>
        {connections.map((conn) => (
          <ConnectionItem key={conn.id} connection={conn} />
        ))}
      </ul>

      {connections.length === 0 && (
        <p className="text-sm text-slate-500">You don&apos;t have any connections yet.</p>
      )}
    </div>
  )
}
