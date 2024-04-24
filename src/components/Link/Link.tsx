import { FC, ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"
import cn from "classnames"
import s from "./Link.module.scss"

interface LinkI {
  children: ReactNode
  to: string
}

export const Link: FC<LinkI> = ({ children, to }) => {
  const location = useLocation()
  return (
    <NavLink to={to} className={cn({ [s.isActive]: location.pathname === to }, s.link)}>
      {children}
    </NavLink>
  )
}
