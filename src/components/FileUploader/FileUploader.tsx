import { ChangeEvent, FC, useState, useEffect } from "react"
import { useUpload } from "shared/hooks/useUpload"
import { extractData, DntData } from "dnt-readerjs"
import { Loader } from "components"
import { ReadVariant } from "shared/types"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { setIsLoading } from "store/loadingSlice"
import Clip from "icons/clip.svg?react"
import cn from "classnames"
import s from "./FileUploader.module.scss"
import { setFile } from "store/fileSlice"

interface FileUploaderI {
  readVariant: ReadVariant
  className?: string
  onFinish?: (data: DntData) => void
  onMultipleFinish?: (data: DntData, fileName: string) => void
  accept: string
  multiple?: boolean
}

export const FileUploader: FC<FileUploaderI> = ({ readVariant, onFinish, className, accept, multiple = false, onMultipleFinish }) => {
  const { status, readFile, loading, setLoading } = useUpload(readVariant, multiple)
  const [fileName, setFileName] = useState("")
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setFile(fileName))
  }, [dispatch, fileName])

  useEffect(() => {
    dispatch(setIsLoading(loading))
  }, [loading, dispatch])

  const handleClick = () => {
    const input = document.getElementById("file-uploader")
    input?.click()
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (multiple) {
      setLoading(true)
      const files = e.target.files
      for (const file of files) {
        const data = await readFile(file)
        setFileName(file.name)
        const result = extractData(data as ArrayBuffer, file.name)
        onMultipleFinish(result as DntData, file.name)
      }
      setLoading(false)
      return
    }

    const file = e.target.files[0]
    const data = await readFile(file)
    setFileName(file.name)
    const result = extractData(data as ArrayBuffer, file.name)
    onFinish(result as DntData)
  }

  return (
    <div className={cn(className, s.fileUploaderCnt, status === "error" && s.error, status === "success" && s.success)}>
      <div className={s.iconCnt}>
        <input type='file' id='file-uploader' accept={accept} className={s.input} hidden multiple={multiple} onChange={(e) => handleChange(e)} />
        <Clip className={s.icon} onClick={handleClick} height={26} width={26} />
      </div>
      {loading ? (
        <Loader className={s.loader} text='Loading...' height={24} width={24} />
      ) : (
        <div className={s.fileName}>{fileName || "File is not attached!"}</div>
      )}
    </div>
  )
}
