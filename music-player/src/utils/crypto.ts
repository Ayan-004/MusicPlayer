import CryptoJS from "crypto-js";

export function decryptUrl(
  encryptedUrl: string,
  key: string = import.meta.env.VITE_DECRYPT_KEY
): string | null {
  try {
    const keyHex = CryptoJS.enc.Utf8.parse(key);

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(encryptedUrl),
    });

    const decrypted = CryptoJS.DES.decrypt(cipherParams, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    const final = decrypted.toString(CryptoJS.enc.Utf8);

    if (!final || final.length < 10) {
      console.warn("Decryption resulted in short/invalid string:", final);
      return null;
    }

    return final;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}



// import CryptoJS from 'crypto-js';

// export const decryptUrl = (encryptedUrl: string) => {
//   try {
//     const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_DECRYPT_KEY);
//     const decrypted = CryptoJS.DES.decrypt(
//       encryptedUrl, 
//       key, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7,
//     });

//     const decoded = decrypted.toString(CryptoJS.enc.Utf8)

//     if(!decoded || decoded.length === 0) {
//       console.warn("Decryption returned empty string")
//       return null;
//     }

//     return decoded;
    
//   } catch (error) {
//     console.error("Decryption error:", error);
//     return ""
//   }
// };