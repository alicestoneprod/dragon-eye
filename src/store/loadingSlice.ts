import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: boolean = false

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => action.payload,
  },
})

export const { setIsLoading } = loadingSlice.actions

export default loadingSlice.reducer
