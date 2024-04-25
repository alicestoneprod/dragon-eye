export const playerTimeFormatter = (time: number) => {
  const integerDigit = (time / 60).toString().split(".")[0]
  const floatDigit = time - 60 * parseInt(integerDigit)
  return floatDigit < 10 ? `${integerDigit}:0${floatDigit}` : `${integerDigit}:${floatDigit}`
}
