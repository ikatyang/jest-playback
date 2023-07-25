import crypto from 'node:crypto'
import { Mode } from './modes.js'

export interface Options {
  /** @default Mode.Auto */
  mode?: Mode
  getRequestCacheKey?: (request: Request) => string | Promise<string>
}

export async function defaultGetRequestCacheKey(request: Request) {
  // modified from https://github.com/sindresorhus/rev-hash/blob/v4.0.0/index.js
  const hash = crypto.createHash('md5')
  hash.update(`${request.method} ${request.url}\n`)
  for (const [name, value] of request.headers) {
    hash.update(`${name}: ${value}\n`)
  }
  hash.update(new Uint8Array(await request.clone().arrayBuffer()))
  return hash.digest('hex').slice(0, 10)
}
