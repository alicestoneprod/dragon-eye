import { FC, useEffect } from "react"
import { DntTable, FileUploader } from "components"
import { DntData } from "dnt-readerjs"
import { setData } from "store/dntSlice"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { ConvertToCsv } from "./ConvertToCsv"
import { setPanelDefaultState, setPanelValue, togglePanelIsOpen } from "store/searchPanelSlice"
import s from "./DntView.module.scss"

interface DntViewI {}

export const DntView: FC<DntViewI> = ({}) => {
  const dispatch = useAppDispatch()
  const onFinish = (data: DntData) => {
    data && dispatch(setData(data))
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault()
        dispatch(togglePanelIsOpen())
      }
    })

    return () => {
      dispatch(setPanelDefaultState())
    }
  }, [dispatch])

  return (
    <div className={s.dntViewCnt}>
      <div className={s.titleTipCnt}>
        <h1 className={s.title}>Explore the mystery of DNT files</h1>
        <p className={s.tip}>Attach .DNT file or drop it on file uploader to watch all data of this file in table</p>
      </div>
      <div className={s.fileUploadCnt}>
        <FileUploader readVariant={"asArrayBuffer"} onFinish={onFinish} className={s.uploader} accept='.dnt' />
      </div>
      <div className={s.tableCnt}>
        <ConvertToCsv />
        <DntTable />
      </div>
      <div className={s.imgCnt}>
        <img src='/assets/sorceress/with_books.png' width={300} height={250} />
      </div>
    </div>
  )
}
