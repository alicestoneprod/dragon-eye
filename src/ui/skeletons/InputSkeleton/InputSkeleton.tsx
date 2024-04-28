import { FC } from "react"
import { Skeleton } from "ui/nextui-components"
import s from "./InputSkeleton.module.scss"

interface InputSkeletonI {}

export const InputSkeleton: FC<InputSkeletonI> = ({}) => {
  return (
    <div className={s.inputSkeletonCnt}>
      <Skeleton className={s.input}></Skeleton>
    </div>
  )
}
