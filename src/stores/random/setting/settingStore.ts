import { create } from 'zustand'

interface SettingState {
  data: {
    items: string[]
  }
  option: {
    randomCount: number[]
    isClaer: boolean
  }
  setData: ({ items }: { items: string[] }) => void
  setOption: ({ randomCount, isClaer }: { randomCount: number[]; isClaer: boolean }) => void
}

export const useRandomSettingStore = create<SettingState>((set) => ({
  data: {
    items: ['data1', 'data2'],
  },
  option: {
    randomCount: [1],
    isClaer: false,
  },
  setData: ({ items }) => set((state) => ({ ...state, data: { items } })),
  setOption: ({ randomCount, isClaer }) => set((state) => ({ ...state, option: { randomCount, isClaer } })),
}))
