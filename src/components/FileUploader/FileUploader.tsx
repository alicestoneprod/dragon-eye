import { ChangeEvent, FC, useState, useEffect } from "react"
import { useUpload } from "shared/hooks/useUpload"
import { extractData, DntData } from "dnt-readerjs"
import { Loader } from "components"
import { ReadVariant } from "shared/types"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { setIsLoading } from "store/loadingSlice"
import { setFile } from "store/fileSlice"
import { useDrop } from "shared/hooks"
import isArray from "lodash/isArray"
import { Clip } from "ui/icons"
import cn from "classnames"
import s from "./FileUploader.module.scss"

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

  const handleDrop = async (files: File[] | File) => {
    if (isArray(files)) {
      setLoading(true)
      for (const file of files) {
        const data = await readFile(file)
        setFileName(file.name)
        const result = extractData(data as ArrayBuffer, file.name)
        onMultipleFinish(result as DntData, file.name)
      }
      setLoading(false)
      return
    }

    const data = await readFile(files)
    setFileName(files.name)
    const result = extractData(data as ArrayBuffer, files.name)
    onFinish(result as DntData)
  }

  const { drag, onDragStart, onDragLeave, onDrop } = useDrop({ multiple, onDropFunc: handleDrop, accept })
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

  return !drag ? (
    <div
      className={cn(className, s.fileUploaderCnt, status === "error" && s.error, status === "success" && s.success)}
      onDragStart={onDragStart}
      onDragOver={onDragStart}
      onDragLeave={onDragLeave}
      onDrop={onDrop}>
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
  ) : (
    <div
      className={cn(className, s.fileUploaderCnt, "flex justify-center items-center text-black")}
      style={{ width: 400, height: 200 }}
      onDragStart={onDragStart}
      onDragOver={onDragStart}
      onDragLeave={onDragLeave}
      onDrop={onDrop}>
      Drop file here
    </div>
  )
}
