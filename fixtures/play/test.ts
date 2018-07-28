require('../../src/index').setup(__dirname, 'play');

import * as request from 'request';

it('should mock correctly for same scope case 1', done => {
  request('http://www.example.com/?case=1', (_err, _res, body) => {
    expect(body).toBe('mocked content');
    done();
  });
});

test('should mock correctly for same scope case 2', done => {
  request('http://www.example.com/?case=2', (_err, _res, body) => {
    expect(body).toBe('mocked content');
    done();
  });
});

test('should mock correctly for other scope', done => {
  request('http://example.org/', (_err, _res, body) => {
    expect(body).toBe('mocked content');
    done();
  });
});

test('should return undefined for unmocked scope', done => {
  request('http://something.else/', (_err, _res, body) => {
    expect(body).toBeUndefined();
    done();
  });
});
