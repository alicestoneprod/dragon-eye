import { FC } from "react"
import cn from "classnames"
import s from "./Loader.module.scss"

interface LoaderI {
  className?: string
  width: number
  height: number
  text?: string
}
export const Loader: FC<LoaderI> = ({ height, width, text, className }) => {
  return (
    <div className={cn(s.loaderCnt, className)}>
      {text}
      <div className={s.loader} style={{ width, height }} />
    </div>
  )
}
