# jest-playback

[![npm](https://img.shields.io/npm/v/jest-playback.svg)](https://www.npmjs.com/package/jest-playback)
[![build](https://img.shields.io/travis/ikatyang/jest-playback/master.svg)](https://travis-ci.org/ikatyang/jest-playback/builds)
[![greenkeeper](https://badges.greenkeeper.io/ikatyang/jest-playback.svg)](https://greenkeeper.io/)

Record and playback http requests from your [Jest](https://facebook.github.io/jest/) tests

[Changelog](https://github.com/ikatyang/jest-playback/blob/master/CHANGELOG.md)

## Install

```sh
# using npm
npm install --save jest-playback

# using yarn
yarn add jest-playback
```
## Usage

Modify your [Jest config](https://facebook.github.io/jest/docs/en/configuration.html) so that looks something like:

(./package.json)

```json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "reporters": [
      "default",
      "jest-playback"
    ]
  }
}
```

If you just want to record requests:

```sh
JEST_PLAYBACK_MODE=record npm run test
```

If you just want to playback records:

```sh
JEST_PLAYBACK_MODE=play npm run test
```

**NOTE** The default mode is `run`, which will playback records and still allow unmocked requests.

## Modes

- run
  - play records
  - enable net connet

- play
  - play records
  - disable net connet

- record
  - enable net connect
  - record all requests

- real
  - enable net connect

## Configs

configs are in the reporter's second field:

```json
{
  "jest": {
    "reporters": [
      "default",
      ["jest-playback", {"option": "value"}]
    ]
  }
}
```

- debug
  - type: boolean
  - default: `false`
  - display debug message

- playbacks
  - type: string
  - default: `<rootDir>/playbacks`
  - specify directory to store records

- mode
  - type: string
  - default: `run`
  - specify which [mode](#modes) to use

- mode_env
  - type: string
  - default: `JEST_PLAYBACK_MODE`
  - specify what environment variable to be used as mode, has higher priority than `mode`

## Development

```sh
# lint
yarn run lint

# build
yarn run build

# test
yarn run test
```

## Related
- [nock](https://github.com/node-nock/nock): HTTP mocking and expectations library
- [ava-playback](https://github.com/dempfi/ava-playback): Record and playback http requests from your ava tests

## License

MIT © [Ika](https://github.com/ikatyang)
