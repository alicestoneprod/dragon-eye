import { FC } from "react"
import { Skeleton } from "@nextui-org/skeleton"
import s from "./InputSkeleton.module.scss"

interface InputSkeletonI {}

export const InputSkeleton: FC<InputSkeletonI> = ({}) => {
  return (
    <div className={s.inputSkeletonCnt}>
      <Skeleton className={s.input}></Skeleton>
    </div>
  )
}
