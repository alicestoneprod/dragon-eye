import { FC, useEffect, useState } from "react"
import { Pagination } from "@nextui-org/pagination"
import { SoundList } from "components"
import { useBgm, usePagination } from "shared/hooks"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { setBgm } from "store/bgmSlice"
import { BGMFormattedFile } from "shared/types"
import { useAppSelector } from "shared/hooks/useAppSelector"
import { SorterFilterRow } from "./SorterFilterRow"
import cn from "classnames"
import s from "./Bgm.module.scss"

interface BgmProps {}

export const Bgm: FC<BgmProps> = () => {
  const { data, isLoading, error } = useBgm()
  const files = useAppSelector((state) => state.bgm)
  const dispatch = useAppDispatch()
  const [filter, setFilter] = useState<string>("")
  const [filteredList, setFilteredList] = useState<BGMFormattedFile[]>([])
  const { currentPage, paginatedArr, onChange, totalPages } = usePagination(7, filteredList || files)

  useEffect(() => {
    if (data) {
      dispatch(setBgm(data))
      setFilteredList(data)
    }
  }, [data, dispatch])

  return (
    <div className={s.bgmCnt}>
      <div className={s.titleTipCnt}>
        <div className={s.title}>Are you want to listen to Background Music?</div>
        <div className={s.tip}>It's not a problem, filter them by duration or name.</div>
      </div>
      <div className={s.musicSectionCnt}>
        <div className={s.filterCnt}>
          <SorterFilterRow
            files={files}
            onChange={onChange}
            setFilter={setFilter}
            setFilteredList={setFilteredList}
            isLoading={isLoading}
            filter={filter}
          />
        </div>
        <div className={cn(s.soundListCnt, { [s.error]: error })}>
          <SoundList loading={isLoading} files={paginatedArr} error={error} filter={filter} />
        </div>
        {paginatedArr?.length > 0 && (
          <div className={s.paginationCnt}>
            <Pagination total={totalPages} initialPage={1} page={currentPage || 1} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  )
}
