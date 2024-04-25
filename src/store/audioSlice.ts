import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: string = ""

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudio: (state, action: PayloadAction<string>) => action.payload,
  },
})

export const { setAudio } = audioSlice.actions

export default audioSlice.reducer
