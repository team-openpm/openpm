'use client'

import {ReactElement, ReactNode} from 'react'
import {ErrorBoundary as ErrorBoundaryBase} from 'react-error-boundary'

export function ErrorBoundary({
  children,
  fallback = <div>Something went wrong</div>,
}: {
  children: ReactNode
  fallback?: ReactElement
}) {
  return <ErrorBoundaryBase fallback={fallback}>{children}</ErrorBoundaryBase>
}
