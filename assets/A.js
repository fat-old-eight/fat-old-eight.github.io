const CryptoJS = require("crypto-js");

//要加密的数据
var data ="1<p>这里是Test，会用来测试一些奇怪的东西。</p>\
<p><del>所以你是怎么找到这的</del></p>\
\
<iframe frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" width=\"330\" height=\"86\" src=\"https://music.163.com/outchain/player?type=2&id=26440351&auto=1&height=66\"></iframe>\
\
<img src=\"https://cdn.jsdelivr.net/gh/BoringHacker/cdn/emojis/majsoul/maj-27.png\">\
\
<!--[喏](https://fat-old-eight.github.io/sth-int.html)-->\
\
<span class=\"heimu\" title=\"你知道的太多了\">你知道的太多了</span>\
"

//秘钥
var aesKey = "c4d038b4bed09fdb1471ef51ec3a32cd";

//将秘钥转换成Utf8字节数组
var key = CryptoJS.enc.Utf8.parse(aesKey);

// 加密参数
const option = {
  iv: CryptoJS.enc.Utf8.parse(aesKey.substring(1, 17)),
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
};


//加密
var encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), key, option);
var encryptData = encrypt.toString();
console.log(encryptData);
// rgt5tbJMD7sLe/f0z3Oa843RQ+7yXXlCinVA+pxhyDY=


//解密
var decrypt = CryptoJS.AES.decrypt(encryptData, key, option);
var decryptData = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8)); //解密后的数据
console.log(decryptData);
// { name: '李雷', age: 18 }