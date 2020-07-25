﻿import CryptoJS, {WordArray} from 'crypto-js';
import jsonfile from 'jsonfile';
import { createHmac } from 'crypto';

// const GenerateRandomSalt = () => {
//   return crypto.randomBytes(32);
// }

const testData = '/yzj08pCqhxV/7qjjPcs+XLHg+lwh5YMbHXHYCp4DIxZeE2sGtkCVuQcIwB0vKQs5924VA+eImNHMf/Yt+p9C6qXvRlYHqVMpwfZNsANrpaXF+ASjT7XEOkpyIJAGwYhfxJpQVrtCx6WbVtDZhhvmaD5GQm796Jf216TXYoFKHveb+VzHGtbyvIqhutvyWgGj3tgZEi/qDfoikl4/uewV9dc4vdc68ijN89sB6kN/L0yjARZd/PAS+sDJ17/GH5gefpZRLzD4KNVxB0+pnj70To33VreqaPsUrQmXtc8TD9kfiVSYT94Tg/4/qdUITQXXsZrtWrEASpQUTNoWUH14fz/8XFHuiL/f/hvjs/7+sXxhIHzRLutaP3D/2aQFlv7sgffdavMeY+U5spvbx7pUhbRirk5zx2QBidiNx/X59UnuyfWvGGDzG53X3JxKhxS5uv6fdISvH+ujgsiuaKrWyYwQVfMsWnjCYh4Oh2GP/vyePfTEzb1Bh4mcJ2KiPzVfZozt22X1k0mOM20vwoHgRHxwm05icaTd4pmG2/FGpUh0xLcOjTW21op43sqFaJJfMJRg7APVAcP60TPf9+Kg6HGj9PvI1BuS3IwXzRtGr3WbD6x3J5tDoY0Nd8eIFU7vL2P2X7yo1l8ybbpWsLd9VeXFCoHLNLFo/11xVPBywYa9hnevIctM9YL73Dn8VIPOApWTfmodZXe+n7qIMRSKsxGxbPyY+2oiZ1ex1oRb6ziMVOrvvvQgBHQ87fBuEhmHTX3PW4vnE0W30xu1G41mgN9oXDUve4BMBzl98ZFggEeB1HOrzlPFVCp0uSeIi7IvIFFAITN/0RbVum6t2MWCyX6mwLFDyBireD6KStp+ojGdSY9yZwm2rUjuCiedAt4Ufa46ckl6Jb1LLSt04JxBLFo4c4bIJ7+tqYumgHEXXsUu6t7y7jkdGEnp3Jyf1eg';
const _salt = 'MuhammadSurgaSavero';

function EncryptText(secretKey: string, data: string): CryptoJS.WordArray {
  const keySize = 256;
  const blockSize = 128;

  const pass: string = CryptoJS.enc.Utf8.parse(secretKey);
  // const salt: string = CryptoJS.lib.WordArray.random(8);
  const salt2: string = CryptoJS.enc.Utf8.parse(_salt);

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
// let tt = jsonfile.readFileSync(`${__dirname}/../data/SRFeature.json`);

function DecryptText(secretKey: string, data: any): CryptoJS.WordArray {
  const keySize = 256;
  const blockSize = 128;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const pass: any = CryptoJS.enc.Utf8.parse(secretKey);
  // const b64 = Buffer.from(data, 'base64');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const salt2: any = CryptoJS.enc.Utf8.parse(_salt);
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

// console.log(DecryptText("SRFramework", testData).toString(CryptoJS.enc.Utf8));

export default {
  salt: () => {
    return _salt;
  },
  encrypted: (secret: string, dt: any) => {

    // const json: any = jsonfile.readFileSync(`${__dirname}/../data/SRFeature.json`);
    // const str: string = JSON.stringify(json);
    const result = EncryptText(secret, dt);
    return result.toString();
  },
  decrypted: (secret: string, data: any) => {
    const decrypt = DecryptText(secret, data);
    return CryptoJS.enc.Utf8.stringify(decrypt)
  },
  hmac: (key: string, url: string) => {
    const hmac = createHmac('sha512', key)
    hmac.update(url, 'utf8')
    return hmac.digest('hex')
  }
}
