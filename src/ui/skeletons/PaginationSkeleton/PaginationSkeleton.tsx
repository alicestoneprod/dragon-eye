import { FC } from "react"
import { Skeleton } from "ui/nextui-components"
import s from "./PaginationSkeleton.module.scss"

interface PaginationSkeletonI {}
export const PaginationSkeleton: FC<PaginationSkeletonI> = ({}) => {
  const arr = ["el1", "el2", "el3", "el4", "el5", "el6", "el7"]
  return (
    <div className={s.paginationSkeletonCnt}>
      {arr.map((el) => (
        <Skeleton key={el} className={s.page}></Skeleton>
      ))}
    </div>
  )
}
