import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface AudioPlayerI {
  currentFilename: string
  currentDuration: number
  paused?: boolean
  maxDuration?: number
  volume: number
  isPlaying: boolean
  link?: string
}

const initialState: AudioPlayerI = {
  currentFilename: "",
  currentDuration: 0,
  volume: 50,
  isPlaying: false,
}

export const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    setCurrentFilename: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentFilename: action.payload,
      }
    },
    setComponent: (state, action: PayloadAction<HTMLAudioElement>) => {
      return {
        ...state,
        component: action.payload,
      }
    },
    setDuration: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentDuration: action.payload,
      }
    },
    setVolume: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        volume: action.payload,
      }
    },
    setMaxDuration: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        maxDuration: action.payload,
      }
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isPlaying: action.payload,
      }
    },
    setLink: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        link: action.payload,
      }
    },
    setPaused: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        paused: action.payload,
      }
    },
  },
})

export const { setCurrentFilename, setComponent, setDuration, setVolume, setMaxDuration, setPlaying, setLink, setPaused } = audioPlayerSlice.actions

export default audioPlayerSlice.reducer
