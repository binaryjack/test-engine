const fs = require('fs')
const path = require('path')

const root = path.join(process.cwd(), 'test-machine', 'backend', 'src', 'infrastructure', 'database', 'seeds')
const files = ['react-mid.ts','react-senior.ts','typescript.ts']
const pattern = /prompt\s*:\s*(['"])([\s\S]*?)\1/g

let found = []
let results = {}

for (const fname of files) {
  const p = path.join(root, fname)
  if (!fs.existsSync(p)) {
    console.warn('WARN: missing', p)
    continue
  }
  const text = fs.readFileSync(p, 'utf8')
  let m
  while ((m = pattern.exec(text)) !== null) {
    const prompt = m[2].trim()
    const start = m.index
    const upto = text.slice(0, start)
    const line = upto.split('\n').length
    found.push({ prompt, file: p, line })
    results[prompt] = results[prompt] || []
    results[prompt].push({ file: p, line })
  }
}

const dups = Object.entries(results).filter(([k, v]) => v.length > 1)
console.log('TOTAL_PROMPTS:', found.length)
console.log('UNIQUE_PROMPTS:', Object.keys(results).length)
console.log('DUPLICATE_PROMPTS_COUNT:', dups.length)
if (dups.length) {
  console.log('\nDUPLICATE PROMPTS:')
  dups.forEach(([prompt, locs], i) => {
    console.log(`\n[${i + 1}] ${prompt}\n`)
    locs.forEach(l => console.log(`  - ${l.file}#L${l.line}`))
  })
} else {
  console.log('\nNo exact duplicate prompts found.')
}

// near-duplicates by normalized whitespace/case
const norm = {}
for (const f of found) {
  const key = f.prompt.toLowerCase().replace(/\s+/g, ' ').trim()
  norm[key] = norm[key] || []
  norm[key].push(f)
}
const near = Object.entries(norm).filter(([k, v]) => v.length > 1)
console.log('\nNEAR_DUPLICATE_GROUPS_COUNT:', near.length)
if (near.length) {
  console.log('\nNEAR DUPLICATE GROUPS:')
  near.forEach(([k, v]) => {
    console.log('\nGroup:')
    v.forEach(item => console.log(`  - ${item.file}#L${item.line}: ${item.prompt}`))
  })
}
