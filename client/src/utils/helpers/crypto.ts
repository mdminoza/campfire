import crypto from 'crypto-js';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cipherText = (value: any): string =>
  crypto.AES.encrypt(
    JSON.stringify(value),
    process.env.REACT_APP_PASSPHRASE || '',
  ).toString();

export const decipherText = (encryptedText: string): any => {
  const bytes = crypto.AES.decrypt(
    encryptedText,
    process.env.REACT_APP_PASSPHRASE || '',
  );
  const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
  return decryptedData;
};
