# jest-playback

[![npm](https://img.shields.io/npm/v/jest-playback.svg)](https://www.npmjs.com/package/jest-playback)
[![build](https://img.shields.io/github/actions/workflow/status/ikatyang/jest-playback/test.yml)](https://github.com/ikatyang/jest-playback/actions?query=branch%3Amaster)

Record and playback HTTP requests from your Jest tests

[Changelog](https://github.com/ikatyang/jest-playback/blob/master/CHANGELOG.md)

## Install

```sh
npm install jest-playback
```

## Usage

```js
import * as jestPlayback from 'jest-playback'

await jestPlayback.setup()

test('example', async () => {
  const response = await fetch('http://www.example.com/')
  expect(response.status).toBe(200)
})
```

The records are stored as snapshots.

## API

```ts
export default setup
export declare function setup(options?: Options): Promise<void>

export interface Options {
  /** @default Mode.Auto */
  mode?: Mode
  getRequestCacheKey?: (request: Request) => string | Promise<string>
}

export enum Mode {
  /**
   * - `Mode.Update` if Jest `--update-snapshot` flag specified
   * - `Mode.Play` if Jest `--ci` flag specified
   * - `Mode.Record` otherwise
   */
  Auto = 'auto',
  /**
   * - all requests are recorded
   */
  Update = 'update',
  /**
   * - play records
   * - new requests are blocked
   */
  Play = 'play',
  /**
   * - play records
   * - new requests are recorded
   */
  Record = 'record',
}
```

## Development

```sh
# lint
pnpm run lint

# build
pnpm run build

# test with jest
pnpm run test:jest

# test with vitest
pnpm run test:vitest
```

## License

MIT © [Ika](https://github.com/ikatyang)
