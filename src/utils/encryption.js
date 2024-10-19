import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const encryptPassword = (password) => {
    if (!SECRET_KEY) {
        throw new Error("La clave secreta no está definida en el archivo .env");
    }

    const key = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(SECRET_KEY).toString().substr(0, 16));

    const ciphertext = CryptoJS.AES.encrypt(password, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();

    return ciphertext;
};

export const decryptPassword = (ciphertext) => {
    if (!SECRET_KEY) {
        throw new Error("La clave secreta no está definida en el archivo .env");
    }

    const key = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(SECRET_KEY).toString().substr(0, 16));

    const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (!originalPassword) {
        throw new Error("La desencriptación falló. La clave puede ser incorrecta.");
    }

    return originalPassword;
};
