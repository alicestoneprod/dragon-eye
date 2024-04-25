import { FC, useContext, useEffect, useState } from "react"
import { Input } from "@nextui-org/react"
import { SoundList } from "components"
import { AppContext } from "providers/FirebaseProvider"
import { cleanup } from "shared/utils"
import { getFirestore, collection } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { BGMFile } from "shared/types"
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { setBgm } from "store/bgmSlice"
import { useAppSelector } from "shared/hooks/useAppSelector"
import Search from "icons/search.svg?react"
import s from "./Bgm.module.scss"

interface BgmI {}

export const Bgm: FC<BgmI> = ({}) => {
  const app = useContext(AppContext)
  const db = getFirestore(app)
  const storage = getStorage(app)
  const [audios, loading, error] = useCollectionData<BGMFile>(collection(db, "bgm"))
  const [audiosLoading, setAudiosLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  console.log(error)
  const files = useAppSelector((state) => state.bgm)
  useEffect(() => {
    const fetchData = async () => {
      if (!loading && audios) {
        setAudiosLoading(true)
        const formattedAudios = []
        for (const el of audios) {
          try {
            const url = await getDownloadURL(ref(storage, `bgm/${el.filename}`))
            const obj = {
              filename: el.filename,
              duration: el.duration,
              link: url,
            }
            formattedAudios.push(obj)
          } catch (error) {
            console.error("Error fetching audio URL:", error)
          }
        }
        dispatch(setBgm(formattedAudios))
        setAudiosLoading(false)
      }
    }

    fetchData()

    return () => {
      cleanup()
    }
  }, [audios, storage, loading, dispatch])

  return (
    <div className={s.bgmCnt}>
      <div className={s.titleTipCnt}>
        <div className={s.title}>Are you want to listen Background Music?</div>
        <div className={s.tip}>It's not a problem, filter them by duration or name.</div>
      </div>
      <div className={s.musicSectionCnt}>
        <div className={s.filterCnt}>
          <Input
            startContent={<Search />}
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder='Search by BGM name...'
            size='sm'
            variant='bordered'
          />
        </div>
        <SoundList files={files} loading={loading ? loading : audiosLoading} />
      </div>
    </div>
  )
}
