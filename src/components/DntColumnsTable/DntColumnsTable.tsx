import { ChangeEvent, FC, useCallback, useMemo } from "react"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue, Input } from "ui/nextui-components"
import { ColumnItemI } from "shared/types"
import { Loader } from "components"
import { useAppSelector } from "shared/hooks/useAppSelector"
import debounce from "lodash/debounce"
import Highlighter from "react-highlight-words"
import { Search } from "ui/icons"
import s from "./DntColumnsTable.module.scss"

interface DntColumnsTableI {
  filteredList: ColumnItemI[]
  filter: string
  setFilter: (value: string) => void
}
export const DntColumnsTable: FC<DntColumnsTableI> = ({ filteredList, filter, setFilter }) => {
  const items = useMemo(() => {
    return filteredList.map((el, index) => {
      return { key: index, columns: el.columns.join(" | "), fileName: el.fileName }
    })
  }, [filteredList])

  const loading = useAppSelector((state) => state.loading)

  const columns = [
    {
      key: "fileName",
      label: "File name",
    },
    {
      key: "columns",
      label: "Columns",
    },
  ]

  const highlightStyle = {
    padding: "2.5px",
    backgroundColor: "#f7b750",
    color: "black",
    borderRadius: "5px",
  }

  const handleChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value.toLowerCase())
    }, 1500),
    [],
  )

  const topContent = useMemo(() => {
    return (
      <div className='flex w-6/12'>
        <Input
          startContent={<Search />}
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder='Search by name...'
          size='sm'
          variant='bordered'
          onClear={() => setFilter("")}
          onChange={(e) => handleChange(e)}
        />
      </div>
    )
  }, [filter, setFilter])
  return (
    <>
      <Table
        topContent={topContent}
        isCompact
        classNames={{
          table: "min-h-[400px]",
        }}>
        <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
        <TableBody
          loadingState={loading ? "loading" : "idle"}
          loadingContent={
            <Loader
              className='flex flex-col-reverse justify-items-center items-center relative top-10'
              width={200}
              height={200}
              text='Data is loading...'
            />
          }
          items={loading ? [] : items}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => {
                return (
                  <TableCell>
                    {<Highlighter highlightStyle={highlightStyle} searchWords={[filter.toString()]} textToHighlight={getKeyValue(item, columnKey)} />}
                  </TableCell>
                )
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
