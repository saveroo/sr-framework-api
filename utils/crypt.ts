﻿import CryptoJS, {WordArray} from 'crypto-js';
import {createHmac} from 'crypto';

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

  return CryptoJS.AES.encrypt(text, ky, {
    keySize: keySize,
    blockSize: blockSize,
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
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
    const decrypt = DecryptText(secret, data);
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
