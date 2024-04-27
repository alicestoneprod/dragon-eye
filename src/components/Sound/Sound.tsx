import { FC } from "react"
import { Slider } from "@nextui-org/react"
import Highlighter from "react-highlight-words"
import { playerTimeFormatter } from "shared/helpers"
import { useAppSelector } from "shared/hooks/useAppSelector"
import Play from "ui/icons/play.svg?react"
import Pause from "ui/icons/pause.svg?react"
import cn from "classnames"
import s from "./Sound.module.scss"

interface SoundI {
  filename: string
  maxDuration: number
  link: string
  filter?: string
  isPlaying: boolean
  onStart: (filename: string, link: string, maxDuration: number) => void
  onPause: () => void
  isPaused: boolean
  isCurrent: boolean
}

export const Sound: FC<SoundI> = ({ filename, maxDuration, link, filter, isPlaying, onStart, onPause, isPaused, isCurrent }) => {
  const currentDuration = useAppSelector((state) => state.audioPlayer.currentDuration)

  return (
    <div className={cn(s.soundCnt, { [s.isCurrent]: isCurrent && isPlaying })}>
      <div className={s.iconStateCnt}>
        {isPlaying ? (
          <Pause aria-label='pause' fill='black' onClick={onPause} />
        ) : (
          <Play fill='black' aria-label='play' onClick={() => onStart(filename, link, maxDuration)} />
        )}
      </div>
      <div className={s.sliderDurationCnt}>
        <Highlighter className={s.name} textToHighlight={filename} searchWords={[`${filter}`]} />
        <div className={s.slider}>
          <Slider
            aria-label='audio-slider'
            key='sm'
            radius='sm'
            step={1}
            size='sm'
            hideThumb
            maxValue={maxDuration}
            value={isCurrent && isPlaying ? currentDuration : isPaused ? currentDuration : 0}
            minValue={0}
            defaultValue={0}
            className='max-w'
          />
        </div>
        <div className={s.durationCnt}>
          <div>{isCurrent && isPlaying ? playerTimeFormatter(currentDuration) : isPaused ? playerTimeFormatter(currentDuration) : "0:00"}</div>
          <div>{playerTimeFormatter(maxDuration)}</div>
        </div>
      </div>
    </div>
  )
}
