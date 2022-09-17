import { ChromeDatabase } from '@/lib/database'
import { IO } from '@/lib/io'
import { Decrypt } from '@/lib/crypt'

export const start = async () => {
  const io = new IO()
  const database = new ChromeDatabase(io.getLoginData())
  const decrypt = new Decrypt()

  await io.checkChromeFiles()

  const accounts = await database.getAccounts()

  await decrypt.captureSecretKey(io.getLocalState())

  for (const account of accounts) {
    const password = decrypt.decryptPassword(account.password)
    console.log('===================================================================')
    console.log(`site: ${account.site}\nuser: ${account.user}\npassword: ${password}`)
  }
  console.log('===================================================================')
}
