import { FC } from "react"
import { Sound } from "components"
import { SoundListSkeleton } from "ui/skeletons"
import { Spinner } from "@nextui-org/react"
import { BGMFormattedFile } from "shared/types"
import { useAppSelector } from "shared/hooks/useAppSelector"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { setCurrentFilename, setLink, setMaxDuration, setPaused, setPlaying } from "store/audioPlayerSlice"
import { Error } from "components"
import s from "./SoundList.module.scss"

interface SoundListI {
  files: BGMFormattedFile[] | null
  loading: boolean
  error: string | null
  filter?: string
}

export const SoundList: FC<SoundListI> = ({ files, loading, error, filter }) => {
  const dispatch = useAppDispatch()
  const soundIsPaused = useAppSelector((state) => state.audioPlayer.paused)
  const soundIsPlaying = useAppSelector((state) => state.audioPlayer.isPlaying)
  const currentSound = useAppSelector((state) => state.audioPlayer.currentFilename)

  const onStart = (filename: string, link: string, maxDuration: number) => {
    dispatch(setPaused(false))
    dispatch(setLink(link))
    dispatch(setCurrentFilename(filename))
    dispatch(setPlaying(true))
    dispatch(setMaxDuration(maxDuration))
  }

  const onPause = () => {
    dispatch(setPlaying(false))
    dispatch(setPaused(true))
  }

  if (loading) {
    return <SoundListSkeleton />
  }

  if (error) {
    return <Spinner labelColor='danger' aria-label='Some error, try later' color='danger' label='Some error, try later, please.' size='lg' />
  }

  if (filter && !files?.length) {
    return (
      <div className={s.soundListCnt}>
        <Error title='Music list is empty' description='Nothing was found for your search...' />
      </div>
    )
  }

  const isPlaying = (item: BGMFormattedFile) => {
    return isCurrent(item) && !soundIsPaused && soundIsPlaying
  }

  const isCurrent = (item: BGMFormattedFile) => {
    return currentSound === item.filename
  }

  const isPaused = (item: BGMFormattedFile) => {
    return (isCurrent(item) && soundIsPaused) || false
  }

  return (
    <div className={s.soundListCnt}>
      {files?.map(
        (audio) =>
          audio && (
            <Sound
              key={audio.filename}
              filename={audio?.filename}
              maxDuration={audio?.duration}
              link={audio.link}
              filter={filter}
              isPaused={isPaused(audio)}
              isPlaying={isPlaying(audio)}
              onStart={onStart}
              onPause={onPause}
              isCurrent={isCurrent(audio)}
            />
          ),
      )}
    </div>
  )
}
