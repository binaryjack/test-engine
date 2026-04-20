import { getDb, queryOneSql, runSql } from '../connection.js'
import bcrypt from 'bcryptjs'

const EMAIL = 'pianatadeo@hotmail.com'
const PASSWORD = 'Admin1234!'

async function main() {
  console.log('[set-admin-password] Initialising DB...')
  await getDb()

  const user = queryOneSql<{ id: string; email: string }>('SELECT * FROM users WHERE email = ?', [EMAIL.toLowerCase()])
  if (!user) {
    console.log('[set-admin-password] User not found:', EMAIL)
    return
  }

  const hash = await bcrypt.hash(PASSWORD, 12)
  runSql('UPDATE users SET passwordHash = ? WHERE id = ?', [hash, user.id])
  const updated = queryOneSql<{ id: string; email: string; role: string }>('SELECT id,email,role FROM users WHERE id = ?', [user.id])
  console.log('[set-admin-password] Updated:', updated)
}

main().catch(err => { console.error('[set-admin-password] Error:', err); process.exit(1) })
