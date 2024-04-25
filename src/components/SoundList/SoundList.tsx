import { FC } from "react"
import { Loader, Sound } from "components"
import { Card, Skeleton, Spinner } from "@nextui-org/react"
import { BGMFile } from "shared/types"
import s from "./SoundList.module.scss"

interface SoundListI {
  files: BGMFile[]
  loading: boolean
}

export const SoundList: FC<SoundListI> = ({ files, loading }) => {
  if (loading) {
    return (
      <div className={s.audioSkeleton}>
        <Skeleton className={s.iconsCnt} />
        <div className={s.rightCnt}>
          <div className={s.nameCnt}>
            <Skeleton className='h-2 w-60 rounded-lg' />
          </div>
          <div className={s.sliderDurationCnt}>
            <Skeleton className={s.sliderCnt}></Skeleton>
            <div className={s.timeCnt}>
              <Skeleton className='h-2 w-8 rounded-lg'></Skeleton>
              <Skeleton className='h-2 w-8 rounded-lg'></Skeleton>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={s.soundListCnt}>{files?.map((audio) => <Sound filename={audio.filename} maxDuration={audio.duration} link={audio.link} />)}</div>
  )
}
