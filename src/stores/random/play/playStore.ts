import { create } from 'zustand'

interface PlayState {
  data: {
    items: string[]
    option: {
      randomCount: number[]
      isClaer: boolean
    }
    results: {
      row: number
      items: string[]
    }[]
  } | null
  setData: ({
    items,
    randomCount,
    isClaer,
    results,
    reset,
  }: {
    items: string[]
    randomCount: number[]
    isClaer: boolean
    results: string[]
    reset?: boolean
  }) => void
}

export const useRandomPlayStore = create<PlayState>((set) => ({
  data: null as PlayState['data'],
  setData: ({ items, randomCount, isClaer, results, reset }) =>
    set((state) => ({
      ...state,
      data: {
        items,
        option: { randomCount, isClaer },
        results: reset
          ? []
          : [
              ...(state.data?.results ?? []),
              {
                row: state.data?.results?.length ?? 0 + 1,
                items: results,
              },
            ]?.filter((result) => result?.items?.length > 0),
      },
    })),
}))
