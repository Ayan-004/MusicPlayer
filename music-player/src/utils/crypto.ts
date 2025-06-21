import CryptoJS from 'crypto-js';

export const decryptUrl = (encryptedUrl: string) => {
    const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_DECRYPT_KEY);
    const decrypted = CryptoJS.DES.decrypt(encryptedUrl, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8)
}