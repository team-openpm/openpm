import clsx from 'clsx'
import React from 'react'

export function Pagination({
  page,
  limit,
  total,
  onChange,
}: {
  page: number
  limit: number
  total: number
  onChange: (page: number) => void
}) {
  const pages = Math.ceil(total / limit)
  const pagesArray = Array.from({length: pages}, (_, i) => i + 1)

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex space-x-2">
        {pagesArray.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            type="button"
            className={clsx(
              `rounded-md border border-pink-500/30 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2`,
              p === page
                ? 'bg-pink-500 text-white hover:bg-pink-500/90'
                : 'bg-white text-pink-500 hover:bg-pink-500/20',
            )}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
