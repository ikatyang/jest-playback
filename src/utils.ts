import * as fs from 'fs';
import glob = require('glob');
import _ = require('lodash');
import mkdir = require('make-dir');
import nock = require('nock');
import * as path from 'path';
import * as url from 'url';

import rev_hash = require('rev-hash');

export function restore() {
  nock.restore();
  nock.recorder.clear();
  nock.cleanAll();
  nock.activate();
}

export function enable_net_connect() {
  nock.enableNetConnect();
}

export function disable_net_connect() {
  nock.disableNetConnect();
}

export function play_nocks(dirname: string) {
  const records = load_records(dirname).map(record => ({
    ...record,
    options: { allowUnmocked: true },
  }));
  nock.define(records).forEach(scope => scope.persist());
}

export function start_record() {
  nock.recorder.rec({
    output_objects: true,
    dont_print: true,
  });
}

export function finish_record(dirname: string) {
  (nock.recorder.play() as nock.NockDefinition[]).forEach(record =>
    write_record(record, dirname),
  );
}

function load_records(dirname: string) {
  const record_extname = get_record_extname();
  return glob
    .sync(`${dirname}/**/*${record_extname}`)
    .map(filename => JSON.parse(fs.readFileSync(filename, 'utf8')));
}

function write_record(record: nock.NockDefinition, dirname: string) {
  const record_filename = get_record_filename(record, dirname);
  mkdir.sync(path.dirname(record_filename));
  fs.writeFileSync(record_filename, JSON.stringify(record, null, 2), 'utf8');
}

function get_record_filename(record: nock.NockDefinition, dirname: string) {
  const record_relative_dirname = get_record_relative_dirname(record);
  const record_basename = get_record_basename(record);
  const record_extname = get_record_extname();
  return path.join(
    dirname,
    record_relative_dirname,
    `${record_basename}${record_extname}`,
  );
}

function get_record_relative_dirname(record: nock.NockDefinition) {
  return _.defaultTo<string>(url.parse(record.scope).hostname, 'unknown');
}

function get_record_basename(record: nock.NockDefinition) {
  const method = _.defaultTo<string>(record.method, 'unknown').toLowerCase();
  const [pathname] = record.path.split('?');
  const formatted_pathname = _.kebabCase(pathname);
  const hash = rev_hash(
    `${method}+${record.status}+${record.scope}+${record.path}+${record.body}`,
  );
  return formatted_pathname.length === 0
    ? `${method}+${hash}`
    : `${method}+${formatted_pathname}+${hash}`;
}

function get_record_extname() {
  return '.nock.json';
}
