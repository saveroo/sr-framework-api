import CryptoJS, {WordArray} from 'crypto-js';
import { createHmac } from 'crypto';
import fs from 'fs';
import fetch from 'node-fetch';
const {CRYPT_SALT: _salt} = process.env;

/**
 * @param {string} secretKey (key to lock)
 * @param {string} data (to be encrypted)
 * @returns {CryptoJS.WordArray}
 */
function EncryptText(secretKey: string, data: string): CryptoJS.WordArray {
  const keySize = 256;
  const blockSize = 128;

  const pass: string = CryptoJS.enc.Utf8.parse(secretKey);
  // const salt: string = CryptoJS.lib.WordArray.random(8);
  const salt2: string = CryptoJS.enc.Utf8.parse(_salt as string);

  const text = CryptoJS.enc.Utf8.parse(data);
  const KeyBytes =  CryptoJS.PBKDF2(pass, salt2, {
    keySize: 48,
    iterations: 1000
  })

  // Key = 32
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const ky = new CryptoJS.lib.WordArray.init(KeyBytes.words, 32)

  // IV = 8 Byte, 16
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const iv = new CryptoJS.lib.WordArray.init(KeyBytes.words.splice(32/4), 16)

  const encryptedText: WordArray = CryptoJS.AES.encrypt(text, ky, {
    keySize: keySize,
    blockSize: blockSize,
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return encryptedText;
}

/**
 * @param {string} secretKey (a key to unlock)
 * @param {*} data to be decrypted (in base 64)
 * @returns {CryptoJS.WordArray} return [xx, xx]
 */
function DecryptText(secretKey: string, data: string): CryptoJS.WordArray {
  const keySize = 256;
  const blockSize = 128;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const pass: string = CryptoJS.enc.Utf8.parse(secretKey);
  // const b64 = Buffer.from(data, 'base64');
  // console.log(b64)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const salt2: string = CryptoJS.enc.Utf8.parse(_salt as string);
  // const text = CryptoJS.enc.Utf8.parse(b64.toString());
  const KeyBytes =  CryptoJS.PBKDF2(pass, salt2, {
    keySize: 48,
    iterations: 1000
  })

  // Key = 32
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const ky = new CryptoJS.lib.WordArray.init(KeyBytes.words, 32)
  // IV = 8 Byte, 16
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const iv = new CryptoJS.lib.WordArray.init(KeyBytes.words.splice(32/4), 16)

  return <WordArray>CryptoJS.AES.decrypt(data, ky, {
    keySize: keySize,
    blockSize: blockSize,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
}
export default {
  salt: () => {
    return _salt;
  },
  encrypted: (secret: string, dt: string) => {
    const result = EncryptText(secret, dt);
    return result.toString();
  },
  decrypted: (secret: string, data: string) => {
    console.log("decrypted", data);
    const decrypt = DecryptText(secret, data);
    console.log("decrypted2", CryptoJS.enc.Utf8.stringify(decrypt));
    return CryptoJS.enc.Utf8.stringify(decrypt)
  },
  hmac: (key: string, url: string) => {
    const hmac = createHmac('sha512', key)
    hmac.update(url, 'utf8')
    return hmac.digest('hex')
  },
  base64HmacDecoder: (b64Hmac: string) => {
      const b = Buffer.from(b64Hmac, 'base64').toString()
      return CryptoJS.enc.Utf8.parse(b).toString() as string;
  }
}



// ScratchPad to debug tokenization.
var test = (key: string, url: string) => {
    const hmac = createHmac('sha512', key)
    hmac.update(url, 'utf8')
    return hmac.digest('hex')
  };
  
  
var dt = "Tue Aug 04 2020 16:44:16 GMT+0000 (Coordinated Universal Time)";
var ndt = new Date(dt).toISOString();
console.log(ndt);

// let imageByte = "";
// let fl = fs.readFileSync(`C:\\Users\\saver\\AppData\\Local\\Temp\\Heapstech\\SR Helper\\cache\\avatar\\medium\\0a632c3faafd74c63f6b1e38706498755febee7a_medium.jpg`)
// // imageByte = Encoding.UTF8.GetBytes(imageByte);
// let f = "s";
// console.log(CryptoJS.enc.Utf8.parse(f))
// console.log(Buffer.from(f).toString("base64"))
// console.log(Buffer.from(fl).toString("base64"))

let url = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/54/54be38c13d0e7792de2af9a76c4e376766cf697a.jpg";
let newUrl = new URL(url);
window.
(async () => {
  let fet = await fetch(url)
  .then(async r => {let buf = await r.arrayBuffer(); return `${Buffer.from(buf).toString("base64")}`});
  console.log(fet);
})()