## 使用 crypto-js 解密 Java AES 加密文本示例



### 使用 crypto-js 加密解密示例

使用 [crypto-js](https://www.npmjs.com/package/crypto-js)  代码示例

```javascript
var CryptoJS = require("crypto-js");
 
// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(originalText); // 'my message'
```



### 使用crypto-js 解密 Java AES 加密文本

使用crypto-js 解密 Java AES 加密文本有几个注意点：

1. 服务器  Java AES 目前实现使用 AES-128 bits(即秘钥长度128 bits) ，ECB 模式， PKCS5 填充；CryptoJS 缺省的加密/解密不是这个模式，所以调用时候必须 指定 ESB 和 PKCS5 填充。而且 js实际上使用 PKCS7 填充，但根据  [What is the difference between PKCS#5 padding and PKCS#7 padding](https://crypto.stackexchange.com/questions/9043/what-is-the-difference-between-pkcs5-padding-and-pkcs7-padding) 是一个东西，所以js调用如下

   ```javascript
       const cipher = CryptoJS.AES.encrypt(caller, realkey, {
           mode: CryptoJS.mode.ECB,
           padding: CryptoJS.pad.Pkcs7,
       })
   ```

   

2. Java 对128 bits 秘钥（seed）做了 `SHA1PRNG` 伪随机处理，js没有对应 `SHA1PRNG`算法，但是实际试验中发现对于 128 bits , 也就是 32长度的 hex string 经过两次sha1 可以得到一样结果。sha1两次处理得到长度32的hex string 还要再转成 128 bits：

```java
// Java 代码，key是32位 hex string
SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
secureRandom.setSeed(pwdKey.getBytes());
//对应js处理
CryptoJS.SHA1(CryptoJS.SHA1(key)).toString().substring(0, 32)
CryptoJS.enc.Hex.parse(hex-string)
```

注，转换成功的原因还待查，但确实得到**一样结果**，另外网上搜到的这个 js 实现，试了好像不好用 https://github.com/bombworm/SHA1PRNG 

从  [Use of “SHA1PRNG” in SecureRandom Class](https://stackoverflow.com/questions/12726434/use-of-sha1prng-in-securerandom-class) 这里看到的讨论：

> `"SHA1PRNG"` is the name of a pseudo random number generator (the PRNG in the name). That means that it uses the SHA1 hash function to generate a stream of random numbers. SHA1PRNG is a proprietary mechanism introduced by Sun at the time... PRNG's are deterministic. That means that they will always generate the same stream of random numbers from the same input material (the "seed")... Note that implementations of SHA1PRNG may differ among JCA providers / different runtimes. The code on Android particularly is different and less stable than the SUN SHA1PRNG. 

但我们至少确认 Java 8在window/linux平台算出值和CryptoJS 算出是一样的。



3. Java 实现最终返回结果是 Base64.encodeBase64URLSafeString 即返回 URLSafeString ， 试了几个npm 包，发现 `base64-url` 较新，可用。

  

### 验证结果

需要进一步和Java实现的机密结果验证

```javascript
95588 ECB 加密串: dys-klCC1unYJXUFAm85Dg
114 ECB 加密串: BuHkVDciUVWGTncsjQ_SBw
84781111 ECB 加密串: M2EAk7SGccktQ1UWM86lGw
1390001234 ECB 加密串: Xf2otWcbwO16sEpBYVsj-g
```



