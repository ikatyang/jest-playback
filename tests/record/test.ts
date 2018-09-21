import * as del from 'del';
import * as glob from 'glob';
import * as request from 'request';

describe('', () => {
  require('../../src/index').setup(__dirname, 'record');

  test('should request correctly', done => {
    request('https://www.google.com', (_err, _res, body) => {
      expect(body).toBeDefined();
      done();
    });
  });
});

describe('', () => {
  test('should record correctly', () => {
    const playbacks = `${__dirname}/__playbacks__`;
    expect(glob.sync(`${playbacks}/**/*.json`).length).toBeGreaterThan(0);
    del.sync(playbacks);
  });
});
