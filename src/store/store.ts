import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dntSlice from "./dntSlice"
import loadingSlice from "./loadingSlice"
import fileSlice from "./fileSlice"

export const store = configureStore({
  reducer: combineReducers({
    table: dntSlice,
    loading: loadingSlice,
    file: fileSlice,
  }),
})
