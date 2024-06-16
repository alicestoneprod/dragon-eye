import { FC, useEffect, useState } from "react"
import { useAppSelector } from "shared/hooks/useAppSelector"
import { AgGridReact } from "ag-grid-react"
import { TableSidebar } from "./TableSidebar"
import { setData, initialState } from "store/dntSlice"
import { useDispatch } from "react-redux"
import { SearchPanel } from "./SearchPanel"
import { getDntData } from "shared/helpers"
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
  const [appendCommand, setAppendCommand] = useState<boolean>(false)
  const [columnDefs, setColumnsDefs] = useState<ColumnsDefsI[]>()
  const dispatch = useDispatch()
  const data = useAppSelector((state) => state.table)
  const panelValue = useAppSelector((state) => state.searchPanel.value)
  const searchVariant = useAppSelector((state) => state.searchPanel.searchVariant)
  const formattedDntData = getDntData(data)

  const onToggleAppendCommand = () => {
    setAppendCommand((prevState) => !prevState)
  }

  useEffect(() => {
    const columns = data?.columnNames?.map((column) => ({
      headerName: column,
      field: column,
      filter: true,
      hide: false,
      // Type of params === CellClassParams from Ag Grid Community, but importing of type is too large, cause library has 1mb size totally.
      cellStyle: (params) => {
        if (searchVariant === "contains") {
          if (panelValue && params.value?.toString()?.toLowerCase().includes(panelValue)) {
            return { color: "black", backgroundColor: "#ffa328", fontWeight: "bold" }
          }
          return null
        }

        if (panelValue && params.value?.toString()?.toLowerCase() === panelValue) {
          return { color: "black", backgroundColor: "#ffa328", fontWeight: "bold" }
        }
        return null
      },
    }))
    setColumnsDefs(columns)
  }, [data, panelValue, searchVariant])

  useEffect(() => {
    return () => {
      dispatch(setData(initialState))
      setColumnsDefs([])
    }
  }, [dispatch])

  const onCellValueCopy = async (value: string) => {
    const finalValue = appendCommand ? `/makeitem ${value}` : value
    await navigator.clipboard
      .writeText(finalValue)
      .then(() => {
        toast.success(`Value ${finalValue} from cell was successfully copied to clipboard`)
      })
      .catch(() => {
        toast.error("An error occurred while copying the value")
      })
  }

  const getFilteredData = (data: object[], filter: string) => {
    const result: object[] = []

    data.forEach((el) => {
      for (const key in el) {
        const value = el[key]?.toString()
        if (value?.includes(filter)) {
          result.push(el)
          break
        }
      }
    })

    return result
  }

  return (
    <div className={s.sidebarTableCnt}>
      <SearchPanel />
      <TableSidebar
        columnDefs={columnDefs}
        setColumnsDefs={setColumnsDefs}
        onToggleAppendCommand={onToggleAppendCommand}
        appendCommand={appendCommand}
      />
      <div className={"ag-theme-balham"} style={{ width: "100%", height: "550px" }}>
        <AgGridReact
          rowData={panelValue ? getFilteredData(formattedDntData, panelValue) : formattedDntData}
          columnDefs={columnDefs}
          rowSelection='multiple'
          onCellDoubleClicked={(e) => onCellValueCopy(e.value)}
        />
      </div>
    </div>
  )
}
