let CryptoJS = require('crypto-js')
const { v4: uuidv4 } = require('uuid')

function codec() {
    //let key = uuidv4()
    let key = '02adc2368daf44c1864b721cc684fb7f'
    // let key = '[B@3930015a'
    console.log(`The key ${key}`)
    const caller = '95588'

    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(caller, key).toString()
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, key)
    var originalText = bytes.toString(CryptoJS.enc.Utf8)

    console.log(`${caller} 加密串: ${ciphertext}`)
    console.log(`CryptoJS 解密结果 ${originalText}`)
}

function codec2() {
    const caller = '95588'
    var key = CryptoJS.enc.Hex.parse('02adc2368daf44c1864b721cc684fb7f')
    //     // var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
    // ​
    //     // encrypt
    //     var aesEncryptor = CryptoJS.algo.AES.createEncryptor(key);
    //     var ciphertextPart1 = aesEncryptor.process("95588");
    //     var ciphertextPart4 = aesEncryptor.finalize();
    //     console.log(`${caller} 加密串: ${ciphertextPart4}`)
    console.log(key)
}

codec()
