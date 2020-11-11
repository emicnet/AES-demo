let CryptoJS = require('crypto-js')
const base64url = require('base64-url')

const callers = ['95588', '114', '84781111', '1390001234']
const key = '02adc2368daf44c1864b721cc684fb7f'

function getKey(key) {
    //真正的key
    return CryptoJS.SHA1(CryptoJS.SHA1(key)).toString().substring(0, 32)
}

function endec(data, realkey) {
    // Encrypt
    const cipher = CryptoJS.AES.encrypt(data, realkey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    let ciphertext = cipher.toString()
    ciphertext = base64url.escape(ciphertext)
    let url = base64url.unescape(ciphertext)

    // Decrypt
    let dec = CryptoJS.enc.Base64.parse(url)
    var bytes = CryptoJS.AES.decrypt({ ciphertext: dec }, realkey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    let originalText = bytes.toString(CryptoJS.enc.Utf8)

    console.log(`${data} ECB 加密串: ${ciphertext}`)
    console.log(`${ciphertext} ECB 解密结果 ${originalText}`)
}

function main() {
    let realkey = CryptoJS.enc.Hex.parse(getKey(key))
    for (const number of callers) {
        endec(number, realkey)
    }
}

main()
