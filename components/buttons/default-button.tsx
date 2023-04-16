import clsx from 'clsx'
import React, {ReactNode} from 'react'

export function DefaultButton({
  type,
  children,
  loading = false,
}: {
  children: ReactNode
  loading?: boolean
  type?: 'submit' | 'button'
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className={clsx(
        `
          rounded-md bg-pink-600 px-4 py-1.5 text-sm font-semibold 
          text-white shadow-sm hover:bg-pink-500 focus-visible:outline 
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600
        `,
        loading && 'cursor-wait opacity-50 bg-slate-500 hover:bg-slate-500',
      )}
    >
      {children}
    </button>
  )
}
