import { AppContext } from "providers/SupabaseProvider"
import { useContext, useEffect, useState } from "react"
import { BGMFile, BGMFormattedFile } from "shared/types"
import { useAppSelector } from "./useAppSelector"

interface UseBgmI {
  data: BGMFormattedFile[] | null
  isLoading: boolean
  error: string | null
}

export const useBgm = (): UseBgmI => {
  const app = useContext(AppContext)
  const [data, setData] = useState<BGMFormattedFile[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dataInStore = useAppSelector((state) => state.bgm)
  useEffect(() => {
    !dataInStore.length && fetchBgm()
  }, [dataInStore])

  const fetchBgm = async () => {
    setIsLoading(true)
    const result = await app.from("bgm").select("*")
    const err = result?.error?.message
    const data = result?.data
    if (err) {
      setError(err)
      setIsLoading(false)
      return
    } else if (data as BGMFile[]) {
      const formattedData: BGMFormattedFile[] = []
      data?.forEach((el: BGMFile) => {
        const url = app.storage.from(import.meta.env.VITE_PROJECT_BUCKET).getPublicUrl("bgm/" + el.filename)?.data?.publicUrl
        const obj = {
          filename: el.filename,
          duration: el.duration,
          link: url,
        }
        formattedData.push(obj)
      })
      setData(formattedData)
      setIsLoading(false)
    }
  }

  return { data, isLoading, error }
}
