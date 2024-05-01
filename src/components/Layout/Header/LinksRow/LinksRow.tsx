import { FC } from "react"
import { LinkT } from "../links"
import { Link } from "components"
import { Close, Menu } from "ui/icons"
import cn from "classnames"
import s from "./LinksRow.module.scss"

interface LinksRowI {
  links: LinkT[]
  gap: number
  isMin: boolean
  onSwapMin: () => void
}

export const LinksRow: FC<LinksRowI> = ({ links, gap, onSwapMin, isMin }) => {
  return (
    <>
      <div className={s.linksRowCntDesktop} style={{ gap }}>
        {links.map((link) => {
          return (
            <Link key={link.title} to={link.to}>
              {link.title}
            </Link>
          )
        })}
      </div>
      <div className={s.linksRowCntMobile} style={{ gap }}>
        {isMin ? <Menu className={s.menu} onClick={onSwapMin} /> : <Close className={s.closeIcon} onClick={onSwapMin} />}
        <MobileLinksList links={links} onClick={onSwapMin} className={isMin ? s.isMin : s.notIsMin} />
      </div>
    </>
  )
}

interface MobileLinksListI {
  links: LinkT[]
  onClick: () => void
  className?: string
}

const MobileLinksList: FC<MobileLinksListI> = ({ links, onClick, className }) => {
  return (
    <div className={cn(className, s.mobileList)}>
      {links.map((link) => (
        <Link key={link.title} to={link.to} onClick={onClick}>
          {link.title}
        </Link>
      ))}
    </div>
  )
}
