import { useState, DragEvent } from "react"

interface UseDropI {
  multiple: boolean
  onDropFunc: (files: File[] | File) => void
  accept: string // accept file extension FORMAT: .dnt, .csv and etc
}

export const useDrop = ({ multiple = false, onDropFunc, accept }: UseDropI) => {
  const [drag, setDrag] = useState<boolean>(false)

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const acceptExt = accept.split(".")[1]
    e.preventDefault()
    if (multiple) {
      const files = [...e.dataTransfer.files]
      const filteredFiles = files.filter((file) => file.name.split(".")[1] === acceptExt)
      onDropFunc(filteredFiles)
      setDrag(false)
      return
    }

    const file = e.dataTransfer.files[0]
    const isOk = file.name.split(".")[1] === acceptExt
    if (isOk) {
      onDropFunc(file)
      setDrag(false)
      return
    }
    setDrag(false)
  }

  return { drag, onDragStart, onDragLeave, onDrop }
}
