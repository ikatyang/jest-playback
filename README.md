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

In setup file or test file:

```js
import setupPlayback from 'jest-playback'
await setupPlayback()
```

The HTTP responses are stored as snapshots:

- default
  - new requests will be stored
  - stored records will be played
- with Jest `--ci` flag specified
  - new requests will be blocked
  - stored records will be played
- with Jest `--update-snapshot` flag specified
  - new requests will be stored
  - stored records will be updated
  - obsolete records will be removed

## API

```ts
declare function setupPlayback(options?: Options): Promise<void>

interface Options {
  getRequestCacheKey?: (request: Request) => string | Promise<string>
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
