import * as request from 'request';

test('should return real content', done => {
  request('http://example.org', (_err, _res, body) => {
    expect(body).toBeDefined();
    expect(body).not.toBe('mocked content');
    done();
  });
});
