import { useEffect, useState } from "react"
import { getTotalPages } from "shared/helpers"
import { BGMFormattedFile } from "shared/types"

interface usePaginationI {
  currentPage: number
  paginatedArr: BGMFormattedFile[]
  onChange: (value: number) => void
  totalPages: number
}

export const usePagination = <T>(elementsPerPage: number, arr: T[]): usePaginationI => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [paginatedArr, setPaginatedArr] = useState<T[]>()
  const [totalPages, setTotalPages] = useState<number>(1)
  useEffect(() => {
    setTotalPages(getTotalPages(arr, elementsPerPage))
  }, [arr, elementsPerPage])
  const resultArr = paginatedArr
  useEffect(() => {
    if (currentPage === 1) {
      setPaginatedArr(arr.slice(0, elementsPerPage))
      return
    }
    setPaginatedArr(arr.slice(elementsPerPage * (currentPage - 1) + 1, elementsPerPage * currentPage + 1))
  }, [currentPage, arr, elementsPerPage])

  const onChange = (value: number) => {
    setCurrentPage(value)
  }

  return {
    currentPage,
    paginatedArr: (resultArr as BGMFormattedFile[]) || [],
    onChange,
    totalPages,
  }
}
