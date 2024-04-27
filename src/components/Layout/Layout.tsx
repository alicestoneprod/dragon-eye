import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { AudioPlayer } from "components"
import { useAppSelector } from "shared/hooks/useAppSelector"

interface LayoutI {}

export const Layout: FC<LayoutI> = ({}) => {
  const currentFilename = useAppSelector((state) => state.audioPlayer.currentFilename)
  return (
    <>
      <Header />
      <Outlet />
      {currentFilename && <AudioPlayer />}
    </>
  )
}
