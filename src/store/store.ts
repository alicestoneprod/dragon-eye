import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dntSlice from "./dntSlice"
import loadingSlice from "./loadingSlice"
import fileSlice from "./fileSlice"
import bgmSlice from "./bgmSlice"
import audioPlayerSlice from "./audioPlayerSlice"
import searchPanelSlice from "./searchPanelSlice"

export const store = configureStore({
  reducer: combineReducers({
    table: dntSlice,
    loading: loadingSlice,
    file: fileSlice,
    bgm: bgmSlice,
    audioPlayer: audioPlayerSlice,
    searchPanel: searchPanelSlice,
  }),
})
