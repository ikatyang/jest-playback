# jest-playback

[![npm](https://img.shields.io/npm/v/jest-playback.svg)](https://www.npmjs.com/package/jest-playback)
[![build](https://img.shields.io/travis/ikatyang/jest-playback/master.svg)](https://travis-ci.org/ikatyang/jest-playback/builds)

Record and playback http requests from your [Jest](https://facebook.github.io/jest/) tests

[Changelog](https://github.com/ikatyang/jest-playback/blob/master/CHANGELOG.md)

## Install

```sh
# using npm
npm install --save-dev jest-playback jest

# using yarn
yarn add --dev jest-playback jest
```

## Usage


```js
// records are stored in `${__dirname}/__playbacks__`.
require("jest-playback").setup(__dirname);

const request = require("request");

test("example", done => {
  request('http://www.example.com/', (_err, _res, body) => {
    expect(body).toMatchSnapshot();
    done();
  });
});
```

You can control which [mode](#modes) to use by specifying the second argument of `setup`:

```js
require("jest-playback").setup(__dirname, "record");
```

or via the `JEST_PLAYBACK_MODE` environment variable:

```sh
JEST_PLAYBACK_MODE=record npx jest
```

## Modes

- `run` (default)
  - play records
  - enable net connet

- `play`
  - play records
  - disable net connet

- `record`
  - enable net connect
  - record all requests

- `real`
  - enable net connect

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
