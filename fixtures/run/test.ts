require('../../src/index').setup(__dirname, 'run');

import * as request from 'request';

test('should mock correctly', done => {
  request('http://example.org', (_err, _res, body) => {
    expect(body).toBe('mocked content');
    done();
  });
});

test('should return real content for unmocked scope', done => {
  request('http://www.example.com/', (_err, _res, body) => {
    expect(body).toBeDefined();
    done();
  });
});
