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
  try {
    const date = string.includes('/') 
      ? new Date(string) 
      : new Date(Number(string))
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    return date.toLocaleDateString('id-ID', options)
    
  } catch (err) {
    return 'Invalid Date'
  }
}