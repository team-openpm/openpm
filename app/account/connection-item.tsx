'use client'

import Link from 'next/link'
import {useRouter} from 'next/navigation'

import {jsonFetch} from '@/lib/json-fetch'
import {UserConnection} from '@/server/db/user-connections/types'

export function ConnectionItem({connection}: {connection: UserConnection}) {
  const router = useRouter()

  const onRevoke = async () => {
    if (
      !confirm(
        `Are you sure you want to revoke this connection to ${connection.package_id}?`,
      )
    ) {
      return
    }

    const {error} = await jsonFetch(`/api/connections/${connection.id}`, {
      method: 'DELETE',
    })

    if (error) {
      alert(error.message)
      throw new Error(error.message ?? 'Unknown error')
    }

    router.refresh()
  }

  return (
    <li className="grid max-w-sm grid-cols-3">
      <Link
        prefetch={false}
        href={`/apis/${connection.package_id}`}
        className="text-sm font-medium text-blue-500"
      >
        {connection.package_id}
      </Link>

      <span className="col-span-2">
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
