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
  let dateParts = string.split('/');
  let dateObject = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
  return dateObject.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}