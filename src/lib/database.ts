import sqlite3 from 'sqlite3'
import { Account, LoginsTable } from '@/commons/interfaces'

export class ChromeDatabase {
  private database: sqlite3.Database

  constructor(databaseFile: string) {
    this.database = new sqlite3.Database(databaseFile)
  }

  private executeQuery<T>(query: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.database.serialize(() => {
        this.database.all(query, (err, rows) => {
          if (err) return reject(err)

          resolve(rows as T)
        })
      })
    })
  }

  public async getAccounts(): Promise<Account[]> {
    const queryResult = await this.executeQuery<LoginsTable[]>(
      'SELECT origin_url, username_value, password_value FROM logins'
    )

    const accounts: Account[] = queryResult.map((row) => ({
      site: row.origin_url,
      user: row.username_value,
      password: row.password_value,
    }))

    return accounts
  }
}
