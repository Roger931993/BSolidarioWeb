import { Injectable } from '@angular/core';
import { environment } from '@web/../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private key = CryptoJS.enc.Utf8.parse(environment.KeyAES256);
  // private secretKey: string = environment.KeyAES256; // Debes usar una clave más segura y almacenarla de manera adecuada.

  constructor() {}

  // Método para cifrar texto
  encryptData(data: string, uri: boolean = true): string {
    try {
      const iv = CryptoJS.lib.WordArray.random(16);
      // Generar IV aleatorio
      const encrypted = CryptoJS.AES.encrypt(data, this.key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Combinar el IV y el texto cifrado en un solo string
      const encryptedData = iv
        .concat(encrypted.ciphertext)
        .toString(CryptoJS.enc.Base64);

      //Codificar el valor cifrado antes de usarlo en la URL
      let encodedId: string = encryptedData;
      if (uri) {
        encodedId = encryptedData
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      }

      // console.log('Encrypt');
      // console.log(data, uri);
      // console.log(encodedId);

      return encodedId;
    } catch (e) {
      console.error('Error al cifrar los datos', e);
      return '';
    }
  }

  // Método para descifrar texto
  decryptData(encryptedData: string, uri?: boolean): string {
    try {
      if (this.key && encryptedData) {
        let encodedId: string = encryptedData;

        if (uri) {
          encodedId = encryptedData.replace(/-/g, '+').replace(/_/g, '/');

          while (encodedId.length % 4 !== 0) {
            encodedId += '=';
          }
        }

        const fullCipher = CryptoJS.enc.Base64.parse(encodedId);
        // Extraer el IV
        const iv = CryptoJS.lib.WordArray.create(
          fullCipher.words.slice(0, 4),
          16
        );
        // IV de 16 bytes
        const cipherText = CryptoJS.lib.WordArray.create(
          fullCipher.words.slice(4)
        );
        // Desencriptar el texto
        const decrypted = CryptoJS.AES.decrypt(
          {
            ciphertext: cipherText,
          },
          this.key,
          {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }
        );

        // if (uri) {
        //   console.log('Decrypt');
        //   console.log(encryptedData);
        //   console.log(encodedId);
        //   console.log(decrypted.toString(CryptoJS.enc.Utf8));
        // }

        return decrypted.toString(CryptoJS.enc.Utf8);
      }

      return encryptedData;
    } catch (e) {
      console.error('Error al descifrar los datos:', e);
      console.error('Error al descifrar:', encryptedData);
      return '';
    }
  }
}
