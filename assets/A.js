const CryptoJS = require("crypto-js");

//要加密的数据
var data ="<p>这里没有东西</p>"

//秘钥
var Key = "114514";

//验证码

var check = CryptoJS.SHA1(Key);
console.log(check.toString());

//二次密钥

var aesKey = CryptoJS.MD5(Key).toString();

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


//解密
var decrypt = CryptoJS.AES.decrypt(encryptData, key, option);
var decryptData = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8)); //解密后的数据
console.log(decryptData);