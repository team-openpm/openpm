import {ReactNode, Suspense} from 'react'

export function Section({title, children}: {title: string; children: ReactNode}) {
  return (
    <section className="space-y-3" id={dasherize(title)}>
      <h2 className="font-medium">{title}</h2>

      <Suspense fallback={<Fallback />}>{children}</Suspense>
    </section>
  )
}

function Fallback() {
  return (
    <div className="grid max-w-sm grid-rows-3 gap-3 rounded-md bg-slate-50 p-3 dark:bg-white/5">
      <div className="h-3 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800"></div>
      <div className="h-3 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800"></div>
      <div className="h-3 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800"></div>
    </div>
  )
}

function dasherize(str: string) {
  return str.replace(/\s+/g, '-').toLowerCase()
}
