import CryptoJS from 'crypto-js'

function decrypt(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, '').toString()
    return bytes.toString(CryptoJS.enc.Utf8)
} 

export default decrypt