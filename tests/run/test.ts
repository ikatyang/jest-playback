require('../../src/index').setup(__dirname, 'run');

import * as request from 'request';

test('should mock correctly', done => {
  request('https://google.com/', (_err, _res, body) => {
    expect(body).toBe('mocked content');
    done();
  });
});

test('should return real content for unmocked scope', done => {
  request('https://www.google.com/', (_err, _res, body) => {
    expect(body).toBeDefined();
    expect(body).not.toBe('mocked content');
    done();
  });
});
