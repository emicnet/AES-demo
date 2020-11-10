### AES 加密示例

使用 [crypto-js](https://www.npmjs.com/package/crypto-js)

秘钥 使用uuid

代码示例

```javascript
var CryptoJS = require("crypto-js");
 
// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(originalText); // 'my message'
```



和目前服务器算出来不一致 应该是因为这个处理造成

```java
SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
```

需要找到对应js实现

`02adc2368daf44c1864b721cc684fb7f` 转换对应的 16 byte s数组 `[59, 106, 116, 80, -17, 27, -41, -39, -73, -102, 84, -33, 114, -117, -84, 124]`



https://blog.csdn.net/max229max/article/details/87639613