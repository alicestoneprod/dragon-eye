import { useState } from "react"
import { ReadVariant } from "shared/types"

interface useUploadReturnI {
  readFile: (file: File) => Promise<ArrayBuffer | string | void>
  status: "success" | "error"
  loading: boolean
  setLoading: (value: boolean) => false
}

export const useUpload = (variant: ReadVariant, multiple: boolean): useUploadReturnI => {
  const [status, setStatus] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const readFile = async (file: File): Promise<ArrayBuffer | string> => {
    return multiple
      ? new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            if (variant === "asArrayBuffer") {
              resolve(reader.result as ArrayBuffer)
            } else if (variant === "asText") {
              resolve(reader.result as string)
            }
            setStatus("success")
          }

          reader.onerror = () => {
            setStatus("error")
            setLoading(false)
            reject(reader.error)
          }

          reader.onabort = () => {
            setStatus("error")
            setLoading(false)
            reject(new Error("Reading was aborted"))
          }

          if (variant === "asArrayBuffer") {
            reader.readAsArrayBuffer(file)
          } else if (variant === "asText") {
            reader.readAsText(file)
          }
        })
      : new Promise((resolve, reject) => {
          const reader = new FileReader()
          setLoading(true)
          reader.onload = () => {
            if (variant === "asArrayBuffer") {
              resolve(reader.result as ArrayBuffer)
              setLoading(false)
            } else if (variant === "asText") {
              resolve(reader.result as string)
              setLoading(false)
            }
            setStatus("success")
          }

          reader.onerror = () => {
            setStatus("error")
            setLoading(false)
            reject(reader.error)
          }

          reader.onabort = () => {
            setStatus("error")
            setLoading(false)
            reject(new Error("Reading was aborted"))
          }

          if (variant === "asArrayBuffer") {
            reader.readAsArrayBuffer(file)
          } else if (variant === "asText") {
            reader.readAsText(file)
          }
        })
  }

  return { status, readFile, loading, setLoading }
}
