export const getTotalPages = <T>(arr: T[], elementsPerPage: number) => {
  const pages = parseInt((arr.length / elementsPerPage).toString().split(".")[0])

  return pages ? pages : 1
}
