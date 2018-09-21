require('../../src/index').setup(__dirname, 'real');

import * as request from 'request';

test('should return real content', done => {
  request('https://www.google.com/', (_err, _res, body) => {
    expect(body).toBeDefined();
    expect(body).not.toBe('mocked content');
    done();
  });
});
