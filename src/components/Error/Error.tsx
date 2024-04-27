import { FC } from "react"
import s from "./Error.module.scss"

interface ErrorI {
  title?: string
  description?: string
}
export const Error: FC<ErrorI> = ({ title, description }) => {
  return (
    <div className={s.errorCnt}>
      <img src='/assets/error/error.png' className={s.errorImg} />
      <div className={s.titleDescCnt}>
        <div className={s.title}>{title}</div>
        <div className={s.desc}>{description}</div>
      </div>
    </div>
  )
}
