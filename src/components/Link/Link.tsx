import { FC, ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"
import cn from "classnames"
import s from "./Link.module.scss"

interface LinkI {
  children: ReactNode
  to: string
  onClick?: () => void
}

export const Link: FC<LinkI> = ({ children, to, onClick }) => {
  const location = useLocation()
  return (
    <NavLink onClick={onClick} to={to} className={cn({ [s.isActive]: location.pathname === to }, s.link)}>
      {children}
    </NavLink>
  )
}
