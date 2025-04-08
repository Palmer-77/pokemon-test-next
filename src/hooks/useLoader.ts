'use client'

import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { LoaderContext } from '@/contexts'

const useLoader = () => useContext(LoaderContext)

const useLoaderContextData = () => {
  const [loadingContext, setLoadingContext] = useState<string[]>([])
  const loading = useMemo(() => loadingContext.length > 0, [loadingContext])

  useEffect(() => {
    if (loading) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [loading])

  const addLoadingContext = useCallback(
    (_loadingContext: string) => {
      setLoadingContext((loadingContext) => [...loadingContext, _loadingContext])
    },
    [setLoadingContext],
  )

  const removeLoadingContext = useCallback(
    (_loadingContext: string) => {
      setLoadingContext((loadingContext) => loadingContext.filter((c) => c !== _loadingContext))
    },
    [setLoadingContext],
  )

  return {
    loading,
    loadingContext,
    addLoadingContext,
    removeLoadingContext,
  }
}

const useLoadingContext = (key?: string, isLoading = false) => {
  const { addLoadingContext, removeLoadingContext } = useLoader()

  useEffect(() => {
    if (!key) return

    if (isLoading) addLoadingContext(key)
    else removeLoadingContext(key)
  }, [isLoading, key])
}

export { useLoader, useLoaderContextData, useLoadingContext }
