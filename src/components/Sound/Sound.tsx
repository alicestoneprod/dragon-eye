import { FC } from "react"
import { Slider, Spinner } from "@nextui-org/react"
import { usePlaying } from "shared/hooks"
import { playerTimeFormatter } from "shared/helpers"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { setAudio } from "store/audioSlice"
import Play from "icons/play.svg?react"
import Pause from "icons/pause.svg?react"
import s from "./Sound.module.scss"

interface SoundI {
  filename: string
  maxDuration: number
  link: string
}

export const Sound: FC<SoundI> = ({ filename, maxDuration, link }) => {
  const { isLoading, isPlaying, currentDuration, onSetDuration, onPause, onPlay } = usePlaying(link, maxDuration, filename)

  const dispatch = useAppDispatch()

  const setCurrentAudio = () => {
    dispatch(setAudio(filename))
  }

  return (
    <div className={s.soundCnt}>
      <div className={s.iconStateCnt}>
        {isLoading ? (
          <Spinner color='default' />
        ) : isPlaying ? (
          <Pause aria-label='pause' fill='black' onClick={onPause} />
        ) : (
          <Play
            fill='black'
            aria-label='play'
            onClick={() => {
              onPlay()
              setCurrentAudio()
            }}
          />
        )}
      </div>
      <div className={s.sliderDurationCnt}>
        <div className={s.name}>{filename}</div>
        <div className={s.slider}>
          <Slider
            aria-label='audio-slider'
            key='sm'
            radius='sm'
            step={1}
            size='sm'
            onChange={(value) => {
              onSetDuration(typeof value === "number" ? value : value[0])
              setCurrentAudio()
            }}
            hideThumb
            maxValue={maxDuration}
            minValue={0}
            defaultValue={0}
            value={currentDuration}
            className='max-w-md'
          />
        </div>
        <div className={s.durationCnt}>
          <div>{playerTimeFormatter(currentDuration)}</div>
          <div>{playerTimeFormatter(maxDuration)}</div>
        </div>
      </div>
    </div>
  )
}
