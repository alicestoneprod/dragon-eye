import { FC } from "react"
import { PaginationSkeleton, SoundSkeleton } from "ui/skeletons"
import s from "./SoundListSkeleton.module.scss"

interface SoundListSkeletonI {}

export const SoundListSkeleton: FC<SoundListSkeletonI> = ({}) => {
  const arr = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className={s.soundListSkeletonCnt}>
      {arr.map((el) => (
        <SoundSkeleton key={el} />
      ))}

      <PaginationSkeleton />
    </div>
  )
}
