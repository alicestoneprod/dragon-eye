import { FC, useCallback, ChangeEvent, useState } from "react"
import { ColumnsDefsI } from "../DntTable"
import { Checkbox, Input } from "ui/nextui-components"
import { Minimize, Unminimize } from "ui/icons"
import debounce from "lodash/debounce"
import cn from "classnames"
import s from "./TableSidebar.module.scss"

interface TableSidebarI {
  columnDefs: ColumnsDefsI[] | undefined
  setColumnsDefs: (columns: ColumnsDefsI[]) => void
  appendCommand: boolean
  onToggleAppendCommand: () => void
}

export const TableSidebar: FC<TableSidebarI> = ({ columnDefs, setColumnsDefs, onToggleAppendCommand, appendCommand }) => {
  const [filter, setFilter] = useState<string>("")
  const [minimized, setMinimized] = useState<boolean>(false)
  const handleInputChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value.toLowerCase())
    }, 1500),
    [],
  )

  const handleHideColumn = (headerName: string): void => {
    if (columnDefs?.length) {
      const columns = columnDefs.map((column) => {
        if (column?.headerName === headerName) {
          return { ...column, hide: !column?.hide }
        }
        return column
      })

      setColumnsDefs(columns)
    }
  }

  const allColumnsAreHidden = () => {
    const hiddenArr = columnDefs?.filter((column) => column.hide)
    return hiddenArr?.length === columnDefs?.length
  }

  const handleHideAllColumns = (columnDefs?: ColumnsDefsI[]): void => {
    if (!allColumnsAreHidden()) {
      const columns = columnDefs?.map((column) => {
        return { ...column, hide: true }
      })
      setColumnsDefs(columns || [])

      return
    }

    const columns = columnDefs?.map((column) => {
      return { ...column, hide: false }
    })
    setColumnsDefs(columns || [])
  }

  const iconProps = { className: s.icon, width: 22, height: 22, onClick: () => setMinimized((prevState) => !prevState) }

  return (
    <div className={cn(s.sidebar, minimized ? s.minimized : s.notMinimized)}>
      {minimized ? <Unminimize {...iconProps} /> : <Minimize {...iconProps} />}
      <h1 className={s.title}>Columns</h1>
      <h1 className={s.tip}>Click on checkbox to hide the column</h1>
      <Input type='text' className={s.input} onChange={handleInputChange} placeholder='Type to filter' />
      <div className={s.hideAllCnt} style={{ display: columnDefs?.length ? "block" : "none" }}>
        <Checkbox onValueChange={() => handleHideAllColumns(columnDefs)} color='secondary' isSelected={allColumnsAreHidden()} />
        <label className={s.hideAllLabel}>Hide all columns</label>
      </div>
      <div className={s.appendCmdCnt}>
        <Checkbox onValueChange={onToggleAppendCommand} color='secondary' isSelected={appendCommand} />
        <label className={s.appendCmdLabel}>Append /makeitem to clipboard</label>
      </div>
      <div className={s.columnsRow}>
        {columnDefs
          ?.filter((column) => column?.headerName?.toLowerCase()?.includes(filter))
          ?.map((column) => {
            return (
              <div className={s.columnRowItem}>
                <Checkbox onValueChange={() => handleHideColumn(column?.headerName)} isSelected={!column?.hide} />
                {column?.headerName}
              </div>
            )
          })}
      </div>
    </div>
  )
}
