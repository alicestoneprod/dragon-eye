import { store } from "store"

export type ReadVariant =
  | {
      variant: "asArrayBuffer" | "asText"
    }
  | string

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppSelector = typeof store.getState

export interface ColumnItemI {
  fileName: string
  columns: string[]
}

export interface BGMFile {
  filename: string
  duration: number
}

export interface BGMFormattedFile extends BGMFile {
  link: string
}
