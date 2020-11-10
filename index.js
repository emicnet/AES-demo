let CryptoJS = require('crypto-js')
const { v4: uuidv4 } = require('uuid')

function codec() {
    let key = uuidv4()
    console.log(`The key ${key}`)
    const caller = '95588'

    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(caller, key).toString()
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, key)
    var originalText = bytes.toString(CryptoJS.enc.Utf8)

    console.log(`${caller} 加密串: ${ciphertext}`)
    console.log(`CryptoJS 加密结果 ${originalText}`)
}

codec()
