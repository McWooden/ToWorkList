export function convertDateFormat(dateString) {
  return dateString.replace(/-/g, '/')
}
export function convertDateFormatBack(dateString) {
  return dateString.replace(/\//g, '-')
}
export function convertDateFormatToInput(dateString) {
  const stripString = dateString.split('/')
  return `${stripString[2]}-${stripString[0]}-${stripString[1]}`
}
export function convertDateToString(string) {
    let dateParts = string.split('/')
    if (dateParts.length === 3) {
      let dateObject = new Date(dateParts[2], dateParts[0] - 1, dateParts[1])
      let result = dateObject.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      return result
    } else {
      const date = new Date(Number(string))
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      const result = date.toLocaleDateString('id-ID', options)
      return result
    }
}