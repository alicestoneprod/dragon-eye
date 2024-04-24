import { DntData } from "dnt-readerjs"

export const joinAllContent = (data: DntData) => {
  const typesRowString = data.columnTypes.join(",")
  const newRows = data.columnNames.map((el) => `_${el}`)
  newRows[0] = "_RowID"
  const rowsString = newRows.join(",")
  const dataString = data.data.map((el: any[]) => el.join(",")).join("\n")
  return typesRowString + "\n" + rowsString + "\n" + dataString + "\n"
}
