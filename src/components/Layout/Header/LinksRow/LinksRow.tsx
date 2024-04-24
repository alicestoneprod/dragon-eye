import { FC } from "react"
import { LinkT } from "../links"
import s from "./LinksRow.module.scss"
import { Link } from "components"

interface LinksRowI {
  links: LinkT[]
  gap: number
}

export const LinksRow: FC<LinksRowI> = ({ links, gap }) => {
  return (
    <div className={s.linksRowCnt} style={{ gap }}>
      {links.map((link) => {
        return (
          <Link key={link.title} to={link.to}>
            {link.title}
          </Link>
        )
      })}
    </div>
  )
}
