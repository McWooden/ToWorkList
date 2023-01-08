export function getLocalAccount() {
    return JSON.parse(localStorage.getItem('account'))
}
export function setLocalAccount(data) {
    return localStorage.setItem('account', JSON.stringify(data))
}