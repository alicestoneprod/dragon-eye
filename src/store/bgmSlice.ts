import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { BGMFile } from "shared/types"

interface BGMFormattedFile extends BGMFile {
  link: string
}

const initialState: BGMFormattedFile[] = []

export const bgmSlice = createSlice({
  name: "bgm",
  initialState,
  reducers: {
    setBgm: (state, action: PayloadAction<BGMFormattedFile[]>) => action.payload,
  },
})

export const { setBgm } = bgmSlice.actions

export default bgmSlice.reducer
