import { FC, useContext, useEffect, useState } from "react"
import { Input } from "@nextui-org/react"
import { SoundList } from "components"
import { AppContext } from "providers/SupabaseProvider"
import { cleanup } from "shared/utils"
import { BGMFile } from "shared/types"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { setBgm } from "store/bgmSlice"
import { useAppSelector } from "shared/hooks/useAppSelector"
import Search from "icons/search.svg?react"
import s from "./Bgm.module.scss"

interface BgmI {}

export const Bgm: FC<BgmI> = ({}) => {
  const app = useContext(AppContext)

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
        <SoundList />
      </div>
    </div>
  )
}
