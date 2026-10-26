'use client'

import { useSyncExternalStore } from 'react'

const noop = () => () => {}

/**
 * Static pages are built once, so a build-time year could go stale. The server renders the
 * build year and the browser swaps in the current year after hydration.
 */
export function CopyrightYear() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  )
  return <>{year}</>
}

const BUILD_YEAR = new Date().getFullYear()
