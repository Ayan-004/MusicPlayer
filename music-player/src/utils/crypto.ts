import CryptoJS from "crypto-js";

export const decryptUrl = (encryptedUrl: string) => {
  try {
    const key = import.meta.env.VITE_DECRYPT_KEY;
    const decrypted = CryptoJS.AES.decrypt(encryptedUrl, key);
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    return result;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};






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