import { FC } from "react"
import { Slider } from "ui/nextui-components"
import Highlighter from "react-highlight-words"
import { playerTimeFormatter } from "shared/helpers"
import { useAppSelector } from "shared/hooks/useAppSelector"
import { Play, Pause, Download } from "ui/icons"
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

  const handleDownload = async () => {
    try {
      const response = await fetch(link)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const downloadLink = document.createElement("a")
      downloadLink.href = blobUrl
      downloadLink.download = filename
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("An error occurred while downloading the file:", error)
    }
  }

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
        <div className={s.nameDownloadCnt}>
          <Highlighter className={s.name} textToHighlight={filename} searchWords={[`${filter}`]} />
          <div className={s.download} onClick={handleDownload}>
            <Download className={s.icon} />
          </div>
        </div>
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
