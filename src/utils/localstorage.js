export function getLocalAccount() {
    return JSON.parse(localStorage.getItem('account'))
}
export function setLocalAccount(data) {
    if (!localStorage.getItem('account')) {
        localStorage.setItem('account', null);
    }
    return localStorage.setItem('account', JSON.stringify(data))
}