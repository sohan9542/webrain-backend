import assert from 'node:assert/strict'
import {readFileSync, readdirSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {describe, it} from 'node:test'
import {fileURLToPath} from 'node:url'

const schemasDir = join(dirname(fileURLToPath(import.meta.url)), '../schemas')

/**
 * @param {string} fileName
 * @returns {string}
 */
function readSchema(fileName) {
  return readFileSync(join(schemasDir, fileName), 'utf8')
}

describe('schema source contracts', () => {
  it('keeps the expected schema modules on disk', () => {
    const files = new Set(readdirSync(schemasDir))
    for (const expected of [
      'index.js',
      'post.js',
      'author.js',
      'category.js',
      'projects.js',
      'reviews.js',
      'blockContent.js',
    ]) {
      assert.ok(files.has(expected), `missing schema file: ${expected}`)
    }
  })

  it('registers document types used by the Webrain frontend', () => {
    const index = readSchema('index.js')
    assert.match(index, /export const schemaTypes/)
    for (const name of ['post', 'author', 'category', 'projects', 'reviews', 'blockContent']) {
      assert.match(index, new RegExp(`\\b${name}\\b`))
    }
  })

  it('keeps stable field names on projects documents', () => {
    const src = readSchema('projects.js')
    assert.match(src, /name:\s*'projects'/)
    for (const field of ['name', 'mainImage', 'publishedAt', 'view', 'desc', 'live']) {
      assert.match(src, new RegExp(`name:\\s*'${field}'`))
    }
  })

  it('keeps stable field names on post documents', () => {
    const src = readSchema('post.js')
    assert.match(src, /name:\s*'post'/)
    for (const field of [
      'title',
      'slug',
      'author',
      'mainImage',
      'categories',
      'publishedAt',
      'metadesc',
      'content',
      'meta',
    ]) {
      assert.match(src, new RegExp(`name:\\s*'${field}'`))
    }
  })

  it('keeps stable field names on reviews documents', () => {
    const src = readSchema('reviews.js')
    assert.match(src, /name:\s*'reviews'/)
    for (const field of ['name', 'position', 'review', 'link', 'mainImage', 'logo']) {
      assert.match(src, new RegExp(`name:\\s*'${field}'`))
    }
  })
})
