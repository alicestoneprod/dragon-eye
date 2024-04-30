import { FC, useState, useMemo } from "react"
import { DntColumnsTable, FileUploader } from "components"
import { DntData } from "dnt-readerjs"
import { ColumnItemI } from "shared/types"
import cn from "classnames"
import s from "./DntColumns.module.scss"

interface DntColumnsI {}

export const DntColumns: FC<DntColumnsI> = ({}) => {
  const [columnItems, setColumnItems] = useState<ColumnItemI[]>([])
  const [filter, setFilter] = useState("")

  const filteredList = useMemo(() => {
    const newData = columnItems ?? []
    const elArray: ColumnItemI[] = []
    newData?.length &&
      newData.forEach((item, index) => {
        const el = item["columns"].filter((value) => {
          if (value.toLowerCase().includes(filter.toLowerCase())) {
            return true
          }
          return false
        })
        el.length && elArray.push({ ...newData[index], columns: [...el] })
      })
    return elArray
  }, [filter, columnItems])

  const onMultipleFinish = (data: DntData, fileName: string) => {
    if (data) {
      addIfNotIcludes(data, fileName)
    }
  }

  const addIfNotIcludes = (data: DntData, fileName: string) => {
    setColumnItems((prevState) => {
      const alreadyIn = prevState.find((columnItem) => columnItem.fileName === fileName)
      if (!alreadyIn) {
        return [
          ...prevState,
          {
            fileName,
            columns: data.columnNames,
          },
        ]
      }
      return prevState
    })
  }

  return (
    <div className={s.dntViewCnt}>
      <div className={s.imgCnt}>
        <img src='/assets/lencea/staying.png' width={400} height={400} />
      </div>
      <div className={s.titleTipCnt}>
        <h1 className={s.title}>Find the answer to your question the fastest</h1>
        <p className={s.tip}>Check for the content of the column you need among the attached .DNT files</p>
      </div>
      <div className={s.fileUploadCnt}>
        <FileUploader readVariant={"asArrayBuffer"} onMultipleFinish={onMultipleFinish} className={s.uploader} multiple accept='.dnt' />
      </div>
      <div className=''>
        <h1>Uploaded files: {columnItems.length}</h1>
      </div>
      <div className={cn(s.tableCnt)}>
        <DntColumnsTable filteredList={filteredList} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  )
}
