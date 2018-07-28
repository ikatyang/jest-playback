import { exec } from 'child_process';
import * as del from 'del';
import * as glob from 'glob';
import * as path from 'path';
import { timeout } from '../fixtures/setup';

const testFixture = (
  testFn: typeof test,
  name: string,
  after: (dirname: string) => void = () => {
    /* do nothing */
  },
) => {
  testFn(
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

testFixture(test, 'play');
testFixture(test, 'run');
testFixture(test, 'real');
testFixture(test, 'record', dirname => {
  const playbacks = `${dirname}/__playbacks__`;
  expect(glob.sync(`${playbacks}/**/*.json`).length).toBeGreaterThanOrEqual(1);
  del.sync(playbacks);
});
