import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: string = ""

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<string>) => action.payload,
  },
})

export const { setFile } = fileSlice.actions

export default fileSlice.reducer
