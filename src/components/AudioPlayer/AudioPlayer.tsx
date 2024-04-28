import { FC, useEffect, useRef } from "react"
import { Slider } from "ui/nextui-components"
import { useAppSelector } from "shared/hooks/useAppSelector"
import { playerTimeFormatter } from "shared/helpers"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { setDuration, setPaused, setPlaying, setVolume } from "store/audioPlayerSlice"
import { Play, VolumeLow, VolumeHigh, Pause } from "ui/icons"
import cn from "classnames"
import s from "./AudioPlayer.module.scss"

interface AudioPlayerI {}

export const AudioPlayer: FC<AudioPlayerI> = ({}) => {
  const audioPlayer = useAppSelector((state) => state?.audioPlayer)
  const link = useAppSelector((state) => state.audioPlayer.link)
  const dispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioPlayer.maxDuration && Math.round(audioPlayer.currentDuration) >= audioPlayer.maxDuration) {
      onAudioFinished()
    }
  }, [audioPlayer?.currentDuration, audioPlayer, audioPlayer.isPlaying])

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = audioPlayer?.volume / 100
    }
  }, [audioPlayer?.volume])

  useEffect(() => {
    if (audioRef?.current && audioPlayer?.paused) {
      audioRef.current.currentTime = audioPlayer?.currentDuration
    }
  }, [audioPlayer?.paused, audioPlayer?.currentDuration])

  useEffect(() => {
    if (audioRef?.current && link && audioPlayer.isPlaying && !audioRef?.current?.src) {
      audioRef.current.src = link
      audioRef.current.play()
    } else if (audioRef?.current && link && audioPlayer.isPlaying) {
      audioRef.current.play()
    }
  }, [link, audioPlayer.isPlaying])

  useEffect(() => {
    const audioElement = audioRef.current

    const handleTimeUpdate = () => {
      if (audioElement && audioPlayer.isPlaying) {
        dispatch(setDuration(audioElement.currentTime))
      }
    }

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate)
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [audioPlayer.isPlaying, dispatch])

  useEffect(() => {
    if (audioPlayer.paused && audioRef?.current) {
      audioRef.current.pause()
    }
  }, [audioPlayer?.paused])

  useEffect(() => {
    const value = parseInt(window.localStorage.getItem("volume") ?? "50")
    dispatch(setVolume(value))
  }, [])

  const onPlay = () => {
    dispatch(setPaused(false))
    dispatch(setPlaying(true))
    audioRef?.current?.play()
  }

  const onPause = () => {
    dispatch(setPlaying(false))
    dispatch(setPaused(true))
    audioRef?.current?.pause()
  }

  const onAudioFinished = () => {
    dispatch(setPlaying(false))
    dispatch(setDuration(0))
    if (audioRef?.current) {
      audioRef.current.currentTime = 0
      audioRef?.current?.pause()
    }
  }

  const onSetDuration = (value: number | number[]) => {
    if (audioRef?.current) {
      const duration = audioPlayer?.maxDuration
      if (typeof value === "number") {
        if (duration && value < duration) {
          dispatch(setDuration(value))
          audioRef.current.currentTime = value
        }
        return
      }
      if (duration && value[0] < duration) {
        audioRef.current.currentTime = value[0]
        dispatch(setDuration(value[0]))
      }
    }
  }

  const onSetVolume = (value: number | number[]) => {
    if (typeof value === "number") {
      dispatch(setVolume(value))
      window.localStorage.setItem("volume", value.toString())
      return
    }
    dispatch(setVolume(value[0]))
    window.localStorage.setItem("volume", value[0].toString())
  }

  return (
    <div className={s.audioPlayerCnt}>
      <div className={s.sliderCnt}>
        <Slider
          aria-label='audio-slider'
          key='sm'
          radius='sm'
          step={0.1}
          size='md'
          hideThumb
          onChange={(value) => onSetDuration(value)}
          value={audioPlayer?.currentDuration}
          maxValue={audioPlayer?.maxDuration}
          className={cn(s.audioSlider)}
        />
      </div>
      <div className={s.durationsCnt}>
        <p className={s.durationItem}>{playerTimeFormatter(audioPlayer?.currentDuration)}</p>
        <p className={s.durationItem}>{playerTimeFormatter(audioPlayer?.maxDuration || 0)}</p>
      </div>
      <div className={s.leftRightCnt}>
        <div className={s.left}>
          <div className={s.filenameButtonsCnt}>
            <div className={s.buttons}>
              {audioPlayer.isPlaying ? <Pause className={s.icon} onClick={onPause} /> : <Play className={s.icon} onClick={onPlay} />}
            </div>
            <div className={s.fileName}>{audioPlayer.currentFilename}</div>
          </div>
        </div>
        <div className={s.right}>
          <Slider
            aria-label='Volume'
            size='sm'
            color='success'
            startContent={<VolumeLow fill='black' className='text-2xl' />}
            endContent={<VolumeHigh fill='black' className='text-2xl' />}
            className={cn("max-w-md", s.volumeSlider)}
            value={audioPlayer.volume}
            onChange={(value) => onSetVolume(value)}
            step={1}
            maxValue={100}
          />
        </div>
      </div>
      <audio src={link} ref={audioRef} />
    </div>
  )
}
