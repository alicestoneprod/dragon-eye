import { FC } from "react"
import { useAppSelector } from "shared/hooks/useAppSelector"
import { joinAllContent } from "shared/helpers"
import { Link } from "ui/nextui-components"
import { DocumentTxt } from "ui/icons"
import s from "./ConvertToCsv.module.scss"
import cn from "classnames"

interface ConvertToCsvI {}
export const ConvertToCsv: FC<ConvertToCsvI> = ({}) => {
  const data = useAppSelector((state) => state.table)
  const file = useAppSelector((state) => state.file)

  const saveAsCsv = () => {
    const content = joinAllContent(data)
    const blob = new Blob([content], { type: "text/csv" })
    const downloadLink = document.createElement("a")
    downloadLink.href = window.URL.createObjectURL(blob)
    downloadLink.download = `${file.split(".dnt")[0]}.csv`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    file && (
      <div className={s.download}>
        <DocumentTxt />
        <Link color='foreground' onClick={saveAsCsv}>
          Save as .csv
        </Link>
      </div>
    )
  )
}
