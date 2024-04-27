import { FC } from "react"
import s from "./SoundSkeleton.module.scss"
import { Skeleton } from "@nextui-org/react"

interface SoundSkeletonI {}
export const SoundSkeleton: FC<SoundSkeletonI> = ({}) => {
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
