import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

type SearchVariant = "contains" | "equals"

interface SearchPanelState {
  isOpen: boolean
  value: string
  searchVariant: SearchVariant
}

const initialState: SearchPanelState = {
  isOpen: false,
  value: "",
  searchVariant: "equals",
}

export const searchPanelSlice = createSlice({
  name: "searchPanel",
  initialState,
  reducers: {
    togglePanelIsOpen: (state) => {
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    },
    setPanelValue: (state, action: PayloadAction<string>) => {
      return { ...state, value: action.payload }
    },
    setPanelSearchVariant: (state, action: PayloadAction<SearchVariant>) => {
      return { ...state, searchVariant: action.payload }
    },
    setPanelDefaultState: () => {
      return { ...initialState }
    },
  },
})

export const { togglePanelIsOpen, setPanelValue, setPanelSearchVariant, setPanelDefaultState } = searchPanelSlice.actions

export default searchPanelSlice.reducer
