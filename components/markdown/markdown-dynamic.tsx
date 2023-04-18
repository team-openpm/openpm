'use client'

import dynamic from 'next/dynamic'

export const MarkdownDynamic = dynamic(
  () => import('./markdown').then((mod) => mod.Markdown),
  {
    ssr: false,
  },
)
