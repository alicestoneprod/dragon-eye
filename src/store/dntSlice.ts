import { createSlice } from "@reduxjs/toolkit"
import { DntData } from "dnt-readerjs"
import type { PayloadAction } from "@reduxjs/toolkit"

export const initialState: DntData = {
  data: [],
  columnNames: [],
  columnTypes: [],
  columnIndexes: {
    [""]: 0,
  },
  numRows: 0,
  numColumns: 0,
}

export const dntSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DntData>) => action.payload,
  },
})

export const { setData } = dntSlice.actions

export default dntSlice.reducer
