import * as fs from 'fs';
import jsonStableStringify = require('json-stable-stringify');
import kebabCase = require('lodash.kebabcase');
import nock = require('nock');
import * as path from 'path';
import revHash = require('rev-hash');
import * as url from 'url';

const PLAYBACK_EXTENSION = '.nock.json';

export function loadRecords(playbackDir: string): nock.Definition[] {
  if (!fs.existsSync(playbackDir)) {
    return [];
  }

  return readDir(playbackDir)
    .filter(isDirectory)
    .map(readDir)
    .reduce(concat)
    .filter(isFile)
    .filter(filename => filename.endsWith(PLAYBACK_EXTENSION))
    .map(filename => JSON.parse(fs.readFileSync(filename, 'utf8')));
}

export function writeRecords(playbackDir: string, records: nock.Definition[]) {
  if (records.length === 0) {
    return;
  }

  ensureDir(playbackDir);

  const hostnameMap: {
    [hostname: string]: Array<[string, nock.Definition]>;
  } = {};

  records.forEach(record => {
    const { hostname = 'unknown' } = url.parse(record.scope);
    const hostnameRecords =
      hostnameMap[hostname] || (hostnameMap[hostname] = []);
    const basename = getRecordBasename(record) + PLAYBACK_EXTENSION;
    hostnameRecords.push([basename, record]);
  });

  Object.keys(hostnameMap).forEach(hostname => {
    const hostnameDir = path.join(playbackDir, hostname);
    ensureDir(hostnameDir);

    hostnameMap[hostname].forEach(([basename, record]) => {
      fs.writeFileSync(
        path.join(hostnameDir, basename),
        JSON.stringify(record, null, 2),
      );
    });
  });
}

function getRecordBasename(record: nock.Definition) {
  const method = (record.method || 'unknown').toLowerCase();
  const [pathname] = record.path.split('?');
  const formattedPathname = kebabCase(pathname);
  const hash = revHash(
    `${method}+${record.status}+${record.scope}+${record.path}+${
      record.body !== null && typeof record.body === 'object'
        ? // https://github.com/ikatyang/jest-playback/issues/349
          jsonStableStringify(record.body)
        : // backward compatibility
          record.body
    }`,
  );
  return formattedPathname.length === 0
    ? `${method}+${hash}`
    : `${method}+${formattedPathname}+${hash}`;
}

function ensureDir(dirname: string) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
}

function isDirectory(pathname: string) {
  return fs.statSync(pathname).isDirectory();
}

function isFile(pathname: string) {
  return fs.statSync(pathname).isFile();
}

function readDir(dirname: string) {
  return fs.readdirSync(dirname).map(basename => path.join(dirname, basename));
}

function concat<T>(a: T[], b: T[]): T[] {
  return a.concat(b);
}
