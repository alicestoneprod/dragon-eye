import { FC, useState } from "react"
import { LinksRow } from "./LinksRow"
import { links } from "./links"
import { useNavigate } from "react-router-dom"
import { Logo } from "ui/icons"
import s from "./Header.module.scss"

interface HeaderI {}

export const Header: FC<HeaderI> = ({}) => {
  const [isMin, setIsMin] = useState(true)

  const onSwapMin = () => {
    setIsMin((prevState) => !prevState)
  }

  const onCloseMin = () => {
    setIsMin(true)
  }

  const navigate = useNavigate()
  return (
    <div className={s.headerCnt}>
      <div className={s.iconTitleCnt} onClick={onCloseMin}>
        <Logo onClick={() => navigate("/")} width={36} height={36} />
        <p className={s.title} onClick={() => navigate("/")}>
          Dragon Eye
        </p>
      </div>
      <div className={s.linksRow}>
        <LinksRow onSwapMin={onSwapMin} isMin={isMin} links={links} gap={24} />
      </div>
    </div>
  )
}
