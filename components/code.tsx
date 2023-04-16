'use client'

export function Code({html: html}: {html: string}) {
  return (
    <div
      className="overflow-x-auto bg-slate-900 p-4 font-mono text-xs text-white dark:bg-white/1"
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
}
