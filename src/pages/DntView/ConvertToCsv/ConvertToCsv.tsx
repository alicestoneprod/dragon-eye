import { FC } from "react"
import { useAppSelector } from "shared/hooks/useAppSelector"
import { joinAllContent } from "shared/helpers"
import { Link } from "@nextui-org/react"
import DocumentTxt from "ui/icons/document-txt.svg?react"
import s from "./ConvertToCsv.module.scss"

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
      <div className='flex py-5 cursor-pointer gap-1 items-center text-lg'>
        <DocumentTxt />
        <Link color='foreground' onClick={saveAsCsv}>
          Save as .csv
        </Link>
      </div>
    )
  )
}
