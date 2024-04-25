import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dntSlice from "./dntSlice"
import loadingSlice from "./loadingSlice"
import fileSlice from "./fileSlice"
import audioSlice from "./audioSlice"
import bgmSlice from "./bgmSlice"

export const store = configureStore({
  reducer: combineReducers({
    table: dntSlice,
    loading: loadingSlice,
    file: fileSlice,
    audio: audioSlice,
    bgm: bgmSlice,
  }),
})
