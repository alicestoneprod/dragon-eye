import { FC, useEffect, useState } from "react"
import { BGMFormattedFile } from "shared/types"
import { InputSkeleton } from "ui/skeletons"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Skeleton } from "@nextui-org/react"
import Search from "ui/icons/search.svg?react"
import Arrow from "ui/icons/arrow-up.svg?react"
import s from "./SorterFilterRow.module.scss"

interface SorterFilterRowI {
  files: BGMFormattedFile[]
  onChange: (value: number) => void
  setFilter: (value: string) => void
  setFilteredList: (arr: BGMFormattedFile[]) => void
  isLoading: boolean
  filter: string
}

export const SorterFilterRow: FC<SorterFilterRowI> = ({ files, onChange, setFilter, setFilteredList, isLoading, filter }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Duration"]))

  const onFilter = (value: string) => {
    setFilter(value)
    onChange(1)
  }

  useEffect(() => {
    setFilteredList(files?.filter((el) => el.filename.includes(filter)))
  }, [filter, files])

  const onSortBy = (variant: "duration" | "ascending" | "descending") => {
    let sortedList: BGMFormattedFile[] = []

    switch (variant) {
      case "duration":
        setFilter("")
        onChange(1)
        sortedList = [...files]
        break
      case "ascending":
        setFilter("")
        onChange(1)
        sortedList = [...files].sort((a, b) => a.duration - b.duration)
        break
      case "descending":
        setFilter("")
        onChange(1)
        sortedList = [...files].sort((a, b) => b.duration - a.duration)
        break
      default:
        break
    }

    setFilteredList(sortedList)
  }

  if (isLoading) {
    return (
      <div className={s.sortInputSkeleton}>
        <InputSkeleton />
        <Skeleton className='w-24 h-10 rounded-lg' />
      </div>
    )
  }

  return (
    <div className={s.sortInputCnt}>
      <Input
        startContent={<Search />}
        isClearable
        placeholder='Search by name'
        size='sm'
        variant='bordered'
        className={s.input}
        value={filter}
        onChange={(e) => onFilter(e.target.value)}
        onClear={() => setFilter("")}
      />
      <div className={s.durationSort}>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered' className='capitalize'>
              {selectedKeys}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Single selection'
            variant='flat'
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}>
            <DropdownItem key='ascending' className={s.dropdownItem} onClick={() => onSortBy("ascending")}>
              <div className={s.dropdownTitle}>Ascending</div>
              <div className={s.dropdownIcon}>
                <Arrow className={s.ascending} />
              </div>
            </DropdownItem>
            <DropdownItem className={s.dropdownItem} key='descending' onClick={() => onSortBy("descending")}>
              <div className={s.dropdownTitle}>Descending</div>
              <div className={s.dropdownIcon}>
                <Arrow className={s.descending} />
              </div>
            </DropdownItem>
            <DropdownItem className={s.dropdownItem} key='duration' onClick={() => onSortBy("duration")}>
              Reset
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}
