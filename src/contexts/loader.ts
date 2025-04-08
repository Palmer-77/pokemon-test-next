'use client'

import { createContext } from 'react'

type LoaderContextData = {
  loading: boolean
  loadingContext: string[]
  addLoadingContext: (_loadingContext: string) => void
  removeLoadingContext: (_loadingContext: string) => void
}

const DefaultLoaderContextData = {
  loading: false,
  loadingContext: [],
  addLoadingContext: () => {},
  removeLoadingContext: () => {},
} satisfies LoaderContextData

const LoaderContext = createContext<LoaderContextData>(DefaultLoaderContextData)

export default LoaderContext
