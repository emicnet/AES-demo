let CryptoJS = require('crypto-js')
const base64url = require('base64-url')
// const { v4: uuidv4 } = require('uuid')
// const UrlSafeString = require('url-safe-string'),
//     tagGenerator = new UrlSafeString()

// let tag1 = tagGenerator.generate('dys+klCC1unYJXUFAm85Dg==')
// console.log(tag1)

const caller = '95588'
//TODO key 转成16 bytes
const key = '02adc2368daf44c1864b721cc684fb7f'

function codec() {
    let realkey = getKey(key)
    const ciphertext = CryptoJS.AES.encrypt(caller, realkey).toString()
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, key)
    var originalText = bytes.toString(CryptoJS.enc.Utf8)

    console.log(`${caller} 加密串: ${ciphertext}`)
    console.log(`CryptoJS 解密结果 ${originalText}`)
}

function codec2() {
    // Encrypt
    let realkey = CryptoJS.enc.Hex.parse(getKey(key))
    const cipher = CryptoJS.AES.encrypt(caller, realkey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    const ciphertext = cipher.toString()
    const ciphertext64 = CryptoJS.enc.Base64.stringify(cipher.ciphertext)
    const ciphertext642 = cipher.ciphertext.toString(CryptoJS.enc.Base64)
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, key)
    var originalText = bytes.toString(CryptoJS.enc.Utf8)

    console.log(
        `${caller} ECB 加密串 cipher.toString: ${ciphertext} --> CryptoJS.enc.Base64 ${cipher.ciphertext}`
    )
    console.log(
        `${caller} ECB 加密串 base64: ${ciphertext64} vs ${ciphertext642}`
    )
    console.log(`CryptoJS ECB 解密结果 ${originalText}`)
}

function encrypt2(data, key) {
    let encrypt = CryptoJS.AES.encrypt(
        data,
        CryptoJS.enc.Hex.parse(getKey(key)),
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        }
    )
    let ciphertext = encrypt.ciphertext.toString()
    let ciphertext64 = encrypt.ciphertext.toString(CryptoJS.enc.Base64)
    console.log(`${caller} ECB 加密 SHA1PRNG 串: ${ciphertext}`)
    console.log(`${caller} ECB 加密 SHA1PRNG 串 base64: ${ciphertext64}`)
}

// let encrypt = (data) => {
//     let key = getKey()
//     let crypted = ''
//     let cipher = CryptoJS.createCipheriv('aes-128-ecb', key, '')
//     crypted = cipher.update(data, 'utf8', 'binary')
//     crypted += cipher.final('binary')
//     crypted = new Buffer(crypted, 'binary').toString('base64')
//     return crypted
// }

function getKey(key) {
    //真正的key
    return CryptoJS.SHA1(CryptoJS.SHA1(key)).toString().substring(0, 32)
}

function decrypt(data, key) {
    let decrypt = CryptoJS.AES.decrypt(
        {
            ciphertext: CryptoJS.enc.Base64.parse(data),
        },
        CryptoJS.enc.Hex.parse(getKey(key)),
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        }
    )
    return decrypt.toString(CryptoJS.enc.Utf8)
}

codec()
codec2()
// let e = encrypt(caller)
// console.log(`aes-128-ecb:${e}`)
// encrypt2(caller, key)

// let k1 = getKey(key)
// var input_bytes = CryptoJS.enc.Hex.parse(k1)
// console.log(input_bytes)

// let d1 = decrypt('dys-klCC1unYJXUFAm85Dg', key)
let d2 = decrypt('BuHkVDciUVWGTncsjQ/SBw==', key)
console.log(`解密 ${d2}`)

// console.log(`${k1} 和 ${k2}`)

let tag = base64url.escape('dys+klCC1unYJXUFAm85Dg==')
let t2 = base64url.unescape(`dys-klCC1unYJXUFAm85Dg`)

console.log(`${tag} vs ${t2}`)

function simple() {
    // Encrypt
    var tmp = CryptoJS.AES.encrypt('my message', 'secret key 123')
    let ciphertext = tmp.toString()
    console.log(`${ciphertext} --- ${CryptoJS.enc.Base64.parse(ciphertext)}`)
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123')
    var originalText = bytes.toString(CryptoJS.enc.Utf8)

    console.log(originalText) // 'my message'
}

simple()
