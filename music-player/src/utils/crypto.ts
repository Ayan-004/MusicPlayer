import CryptoJS, { enc } from 'crypto-js';

export const decryptUrl = (encryptedUrl: string) => {
  try {
    if(!encryptedUrl || encryptedUrl.length < 10) {
      throw new Error("Invalid or missing encrypted URL");
    }
    const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_DECRYPT_KEY);
    const decrypted = CryptoJS.DES.decrypt(encryptedUrl, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if(!result || result.includes("undefined")) {
      throw new Error("Decryption failed: result malformed")
    }
    
    return result;
  } catch (error) {
    console.error("Decryption error:", error);
    return ""
  }
};