import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { BGMFormattedFile } from "shared/types"

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
