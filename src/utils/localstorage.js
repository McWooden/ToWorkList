import CryptoJS from 'crypto-js'

const secretKey = process.env.REACT_APP_CRYPTO_KEY


// LocalStorage vanilla
export function getStorage(keyName) {
    return localStorage.getItem(keyName)
}
export function setStorage(keyName, data) {
    return localStorage.setItem(keyName, data)
}
// LocalStorage dengan crypto dan JSON
export function getLocalStorage(keyName) {
    const encryptedData = localStorage.getItem(keyName)
    if (!encryptedData) return null

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8)

    return JSON.parse(decryptedData)
}

export function setLocalStorage(keyName, data) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
    localStorage.setItem(keyName, encryptedData)
}

// LocalStorage tanpa crypto dengan JSON
export function getLocalStorageWithoutEncrypt(key) {
    const data = JSON.parse(localStorage.getItem(key))
    if (data) return
    return data
}

export function setLocalStorageWithoutEncrypt(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

// LocalStorage Account dengan crypto dan JSON
export function getLocalAccount() {
    const encryptedData = localStorage.getItem('account')
    if (!encryptedData) return null

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8)

    return JSON.parse(decryptedData)
}

export function setLocalAccount(data) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
    localStorage.setItem('account', encryptedData)
}

// LocalStorage dengan JSON
export function getLocalAccountWithoutEncrypt() {
    const data = localStorage.getItem('account')
    if (!data) return null

    return data
}
export function setLocalAccountWithoutEncrypt(data) {
    localStorage.setItem('account', data)
}

// crypto
export function encrypt(data) {
    return CryptoJS.AES.encrypt(data, secretKey).toString()
}
export function decrypt(data) {
    const bytes  = CryptoJS.AES.decrypt(data, secretKey)
    return bytes.toString(CryptoJS.enc.Utf8)
}