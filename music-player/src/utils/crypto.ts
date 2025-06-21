import CryptoJS from 'crypto-js';

export const decryptUrl = (encryptedUrl: string) => {
  if(!encryptedUrl || encryptedUrl.length % 4 !== 0) {
    console.warn("Invalid encrypted URL", encryptedUrl);
  }
  try {
    const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_DECRYPT_KEY);
    const decrypted = CryptoJS.DES.decrypt(encryptedUrl, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    const url = decrypted.toString(CryptoJS.enc.Utf8);
    return url;
    
  } catch (error) {
    console.error("Decryption error:", error);
    return ""
  }
};