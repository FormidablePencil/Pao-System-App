export const formatNum = (number) => {
  const numString = number.toString()
  if (numString.length === 1)
    return '0' + numString
  return numString
}