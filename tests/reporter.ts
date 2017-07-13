import {exec} from 'child_process';
import * as path from 'path';

const test_fixture = (test_fn: typeof test, name: string) => {
  test_fn(name, done => {
    const dirname = path.resolve(__dirname, '../fixtures', name);
    exec(`jest -c ${dirname}/jest.json`, err => {
      expect(err).toBeFalsy();
      done();
    });
  });
};

test_fixture(test, 'play');
test_fixture(test, 'run');
