// store.ts
// store.ts
// store.ts
// store.ts
import create from "zustand"

type State = {
  rows: number
  cols: number
  bombs: number
  openedTilesCount: number
  setRows: (value: number) => void
  setCols: (value: number) => void
  setBombs: (value: number) => void
  setOpenedTilesCount: (value: number) => void
}

export const useStore = create<State>((set) => ({
  rows: 5,
  cols: 5,
  bombs: 3,
  openedTilesCount: 0,
  setRows: (rows) => set({ rows }),
  setCols: (cols) => set({ cols }),
  setBombs: (bombs) => set({ bombs }),
  setOpenedTilesCount: (openedTilesCount) => set({ openedTilesCount }),
}))
