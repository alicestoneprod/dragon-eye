import { FC, useEffect, useState } from "react"
import { useAppSelector } from "shared/hooks/useAppSelector"
import { AgGridReact } from "ag-grid-react"
import { TableSidebar } from "./TableSidebar"
import { setData, initialState } from "store/dntSlice"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import s from "./DntTable.module.scss"

interface DntTableI {}

export interface ColumnsDefsI {
  headerName: string
  field: string
  filter: boolean
  hide: boolean
}

export const DntTable: FC<DntTableI> = ({}) => {
  const [columnDefs, setColumnsDefs] = useState<ColumnsDefsI[]>()
  const dispatch = useDispatch()
  const data = useAppSelector((state) => state.table)

  useEffect(() => {
    const columns = data?.columnNames?.map((column) => ({
      headerName: column,
      field: column,
      filter: true,
      hide: false,
    }))
    setColumnsDefs(columns)
  }, [data])

  useEffect(() => {
    return () => {
      dispatch(setData(initialState))
      setColumnsDefs([])
    }
  }, [dispatch])

  const onCellValueCopy = async (value: string) => {
    await navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success(`Value ${value} from cell was successfully copied to clipboard`)
      })
      .catch(() => {
        toast.error("An error occurred while copying the value")
      })
  }

  const getData = () => {
    if (!data || !data.columnNames || !data.data || !data.data.length) {
      return []
    }
    const dataSource = []
    const columns = data.columnNames
    const values = data.data
    const valuesLength = values.length
    const columnsLength = columns.length

    for (let i = 0; i < valuesLength; i++) {
      const el = values[i]
      const obj = {}

      for (let j = 0; j < columnsLength; j++) {
        obj[columns[j]] = el[j]
      }

      dataSource.push(obj)
    }

    return dataSource
  }

  return (
    <div className={s.sidebarTableCnt}>
      <TableSidebar columnDefs={columnDefs} setColumnsDefs={setColumnsDefs} />
      <div className={"ag-theme-balham"} style={{ width: "100%", height: "550px" }}>
        <AgGridReact rowData={getData()} columnDefs={columnDefs} rowSelection='multiple' onCellDoubleClicked={(e) => onCellValueCopy(e.value)} />
      </div>
    </div>
  )
}
