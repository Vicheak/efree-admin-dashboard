import CryptoJS from 'crypto-js'

function encrypt(data) {
    return CryptoJS.AES.encrypt(data, '').toString()
}

export default encrypt