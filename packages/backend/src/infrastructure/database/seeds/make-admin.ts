import { getDb, queryOneSql, runSql } from '../connection.js'
import { migrate } from '../schema.js'
import { seed } from '../seed.js'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const EMAIL = 'pianatadeo@hotmail.com'
const LOWER_EMAIL = EMAIL.toLowerCase()
const PASSWORD = 'Admin1234!'

async function main() {
  console.log('[make-admin] Initialising DB...')
  await getDb()
  await migrate()
  await seed()

  const existing = queryOneSql<{ id: string; email: string; role: string }>('SELECT * FROM users WHERE email = ?', [LOWER_EMAIL])
  if (existing) {
    runSql('UPDATE users SET role = ? WHERE id = ?', ['admin', existing.id])
    console.log(`[make-admin] Updated existing user: ${LOWER_EMAIL} -> role=admin`)
  } else {
    const passwordHash = await bcrypt.hash(PASSWORD, 12)
    const id = uuidv4()
    runSql(
      `INSERT INTO users (id, email, passwordHash, displayName, role, createdAt)
       VALUES (?, ?, ?, ?, 'admin', ?)`,
      [id, LOWER_EMAIL, passwordHash, 'Admin', new Date().toISOString()]
    )
    console.log(`[make-admin] Created admin user: ${LOWER_EMAIL} with password: ${PASSWORD}`)
  }

  const updated = queryOneSql<{ id: string; email: string; role: string }>('SELECT id,email,role FROM users WHERE email = ?', [LOWER_EMAIL])
  console.log('[make-admin] Verified:', updated)

  const total = queryOneSql<{ cnt: number }>('SELECT COUNT(*) as cnt FROM questions')
  const react = queryOneSql<{ cnt: number }>('SELECT COUNT(*) as cnt FROM questions WHERE technologyId = (SELECT id FROM technologies WHERE slug = ?)', ['react'])
  const typescript = queryOneSql<{ cnt: number }>('SELECT COUNT(*) as cnt FROM questions WHERE technologyId = (SELECT id FROM technologies WHERE slug = ?)', ['typescript'])
  const nextjsPrompts = queryOneSql<{ cnt: number }>('SELECT COUNT(*) as cnt FROM questions WHERE prompt LIKE ?', ['%Next.js%'])

  console.log(`\n[make-admin] Question counts:`)
  console.log(`  Total: ${total?.cnt ?? 0}`)
  console.log(`  React: ${react?.cnt ?? 0}`)
  console.log(`  TypeScript: ${typescript?.cnt ?? 0}`)
  console.log(`  Prompts containing "Next.js": ${nextjsPrompts?.cnt ?? 0}`)
  console.log('[make-admin] Done ✓')
}

main().catch(err => { console.error('[make-admin] Error:', err); process.exit(1) })
