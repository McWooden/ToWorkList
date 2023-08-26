import CryptoJS from 'crypto-js'

const secretKey = process.env.REACT_APP_CRYPTO_KEY

// account storage
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

// costum local storage with encrypt
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

// costum local storage without encrypt
export function getLocalAccountWithoutEncrypt() {
    const data = localStorage.getItem('account')
    if (!data) return null

    return JSON.parse(data)
}

export function setLocalAccountWithoutEncrypt(data) {
    localStorage.setItem('account', data)
}

// encrypt and decrypt
export function encrypt(data) {
    return CryptoJS.AES.encrypt(data, secretKey).toString()
}
export function decrypt(data) {
    const bytes  = CryptoJS.AES.decrypt(data, secretKey)
    return bytes.toString(CryptoJS.enc.Utf8)
}