import { DntData } from "dnt-readerjs"

export const getDntData = (data: DntData) => {
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
