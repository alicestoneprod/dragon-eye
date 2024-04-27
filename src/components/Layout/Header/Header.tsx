import { FC } from "react"
import { LinksRow } from "./LinksRow"
import { links } from "./links"
import { useNavigate } from "react-router-dom"
import Logo from "ui/icons/eye.svg?react"
import s from "./Header.module.scss"

interface HeaderI {}

export const Header: FC<HeaderI> = ({}) => {
  const navigate = useNavigate()
  return (
    <div className={s.headerCnt}>
      <div className={s.iconTitleCnt}>
        <Logo onClick={() => navigate("/")} width={36} height={36} />
        <p className={s.title} onClick={() => navigate("/")}>
          Dragon Eye
        </p>
      </div>
      <div className={s.linksRow}>
        <LinksRow links={links} gap={24} />
      </div>
    </div>
  )
}
