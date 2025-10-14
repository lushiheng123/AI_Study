const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname, '../data/episodes.json')
let data
try {
  data = JSON.parse(fs.readFileSync(file, 'utf8'))
} catch (err) {
  console.error('Failed to read episodes.json:', err.message)
  process.exit(2)
}

if (!Array.isArray(data)) {
  console.error('episodes.json must be an array')
  process.exit(2)
}

const seen = new Set()
const errors = []
data.forEach((ep, i) => {
  if (!ep.slug) errors.push(`Item ${i} missing slug`)
  if (!ep.title) errors.push(`Item ${i} missing title`)
  if (seen.has(ep.slug)) errors.push(`Duplicate slug: ${ep.slug}`)
  seen.add(ep.slug)
})

if (errors.length) {
  console.error('Validation errors:')
  errors.forEach(e => console.error('- ' + e))
  process.exit(1)
}

console.log('episodes.json validation passed —', data.length, 'items')
process.exit(0)
