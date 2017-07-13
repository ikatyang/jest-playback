import * as fs from 'fs';
import * as request from 'request';

test('should request correctly', done => {
  request('http://example.org', done);
});
