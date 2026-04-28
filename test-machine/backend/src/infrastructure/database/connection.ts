import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { createRequire } from 'module'
import path from 'path'

const require = createRequire(import.meta.url)

/**
 * SQL.js type definitions
 * sql.js doesn't have complete TypeScript types, so we define minimal interfaces
 */
interface SqlStatement {
  bind(params: unknown[]): boolean
  step(): boolean
  getAsObject(): Record<string, unknown>
  free(): void
}

interface SqlDatabase {
  prepare(sql: string): SqlStatement
  run(sql: string, params: unknown[]): void
  exec(sql: string): void
  export(): Uint8Array
}

interface SqlJs {
  Database: new (data?: ArrayLike<number>) => SqlDatabase
}

const initSqlJs = require('sql.js') as (config?: Record<string, unknown>) => Promise<SqlJs>

const DB_DIR = path.resolve(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'test-machine.db')

let _db: SqlDatabase | null = null

export async function getDb(): Promise<SqlDatabase> {
  if (_db) return _db

  const SQL = await initSqlJs()

  if (!existsSync(DB_DIR)) {
    mkdirSync(DB_DIR, { recursive: true })
  }

  if (existsSync(DB_PATH)) {
    const fileBuffer = readFileSync(DB_PATH)
    _db = new SQL.Database(fileBuffer)
  } else {
    _db = new SQL.Database()
  }

  return _db
}

export function persistDb(): void {
  if (!_db) return
  // Skip file persistence in test environment
  if (process.env.NODE_ENV === 'test') return
  const data: Uint8Array = _db.export()
  if (!existsSync(DB_DIR)) {
    mkdirSync(DB_DIR, { recursive: true })
  }
  writeFileSync(DB_PATH, Buffer.from(data))
}

// Helper: run a statement and persist
export function runSql(sql: string, params: unknown[] = []): void {
  if (!_db) throw new Error('DB not initialised — call getDb() first')
  _db.run(sql, params)
  persistDb()
}

// Helper: query returning all rows as objects
export function querySql<T = Record<string, unknown>>(sql: string, params: unknown[] = []): T[] {
  if (!_db) throw new Error('DB not initialised — call getDb() first')
  const stmt = _db.prepare(sql)
  stmt.bind(params)
  const rows: T[] = []
  while (stmt.step()) {
    rows.push(stmt.getAsObject() as T)
  }
  stmt.free()
  return rows
}

// Helper: query returning a single row or null
export function queryOneSql<T = Record<string, unknown>>(sql: string, params: unknown[] = []): T | null {
  const rows = querySql<T>(sql, params)
  return rows.length > 0 ? rows[0] : null
}

/**
 * TEST-ONLY — inject a pre-built sql.js in-memory database.
 * Disables file persistence for the lifetime of that DB.
 * Call with```jsx\n null``` to reset to the uninitialised state.
 */
export function _initTestDb(db: SqlDatabase | null): void {
  _db = db
}
