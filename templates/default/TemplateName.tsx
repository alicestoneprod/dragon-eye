import { FC } from "react"
import s from "./TemplateName.module.scss"

interface TemplateNameI {}
export const TemplateName: FC<TemplateNameI> = ({}) => {
  return <div className={s.templateNameCnt}>TemplateName</div>
}
