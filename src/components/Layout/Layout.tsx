import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import s from "./Layout.module.scss"

interface LayoutI {}

export const Layout: FC<LayoutI> = ({}) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
