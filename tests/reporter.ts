import {exec} from 'child_process';
import * as del from 'del';
import * as glob from 'glob';
import * as path from 'path';
import {timeout} from '../fixtures/setup';

const test_fixture = (
    test_fn: typeof test,
    name: string,
    after: (dirname: string) => void = () => { /* do nothing */ },
    ) => {
  test_fn(
    name,
    done => {
      const dirname = path.resolve(__dirname, '../fixtures', name);
      exec(`jest -c ${dirname}/jest.json`, err => {
        expect(err).toBeFalsy();
        after(dirname);
        done();
      });
    },
    timeout,
  );
};

test_fixture(test, 'play');
test_fixture(test, 'run');
test_fixture(test, 'real');
test_fixture(test, 'record', dirname => {
  const playbacks = `${dirname}/playbacks`;
  expect(glob.sync(`${playbacks}/**/*.json`).length).toBeGreaterThanOrEqual(1);
  del.sync(playbacks);
});
