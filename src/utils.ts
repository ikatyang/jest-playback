import * as fs from 'fs';
import * as glob from 'glob';
import * as mkdir from 'make-dir';
import * as mime from 'mime';
import * as nock from 'nock';
import * as path from 'path';
import * as R from 'ramda';
import * as url from 'url';

import kebabcase = require('lodash.kebabcase');
import rev_hash = require('rev-hash');

export function start_record() {
  nock.recorder.rec({
    output_objects: true,
    dont_print: true,
  });
}

export function finish_record(dirname: string) {
  const nock_definitions = nock.recorder.play() as nock.NockDefinition[];
  nock_definitions.forEach(nock_definition => {
    const record_dirname = get_record_dirname(dirname, nock_definition);
    write_nock_definition(record_dirname, nock_definition);
  });
}

export function play_nocks(dirname: string) {
  const nock_definitions = load_files(dirname).map(nock_definition => ({
    ...nock_definition,
    options: {allowUnmocked: true},
  }));
  nock.define(nock_definitions).forEach(scope => scope.persist());
}

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

function get_record_dirname(dirname: string, nock_definition: nock.NockDefinition) {
  const {hostname} = url.parse(nock_definition.scope);
  return path.join(dirname, hostname!);
}

function write_nock_definition(dirname: string, nock_definition: nock.NockDefinition) {
  if (!fs.existsSync(dirname)) {
    mkdir.sync(dirname);
  } else if (!fs.statSync(dirname).isDirectory()) {
    throw new Error(`Path '${dirname}' should be a directory`);
  }
  write_file(nock_definition, dirname);
}

function load_files(dirname: string) {
  return glob.sync(`${dirname}/**/*-info.json`).map(filename => {
    const info = JSON.parse(fs.readFileSync(filename, 'utf8')) as nock.NockDefinition & {response: never};

    const extension = get_body_extension(info);
    const body = fs.readFileSync(filename.replace(/-info\.json$/, `-body${extension}`), 'utf8');

    const nock_definition: nock.NockDefinition = {...info, response: body};
    return nock_definition;
  });
}

function write_file(nock_definition: nock.NockDefinition, dirname: string) {
  const info = R.omit(['response'], nock_definition);
  const info_filename = get_info_filename(nock_definition);
  fs.writeFileSync(path.join(dirname, info_filename), JSON.stringify(info, null, 2), 'utf8');

  const body = nock_definition.response;
  const body_filename = get_body_filename(nock_definition);
  fs.writeFileSync(path.join(dirname, body_filename), body, 'utf8');
}

function get_base_filename(nock_definition: nock.NockDefinition) {
  const [pathname, querystring = ''] = nock_definition.path.split('?');
  return `${kebabcase(`${nock_definition.method}-${pathname}`)}-${rev_hash(querystring)}`;
}

function get_info_filename(nock_definition: nock.NockDefinition) {
  return `${get_base_filename(nock_definition)}-info.json`;
}

function get_body_filename(nock_definition: nock.NockDefinition) {
  const extension = get_body_extension(nock_definition);
  return `${get_base_filename(nock_definition)}-body${extension}`;
}

function get_body_extension(nock_definition: nock.NockDefinition) {
  return R.pipe(get_content_type, get_extension)(nock_definition);
}

function get_content_type(nock_definition: nock.NockDefinition) {
  const headers = R.defaultTo([], R.prop('rawHeaders', nock_definition)) as string[];
  return R.ifElse(
    R.equals(-1),
    R.always(''),
    index => R.defaultTo('', headers[index + 1]),
  )(headers.indexOf('Content-Type'));
}

function get_extension(content_type: string) {
  return R.ifElse(
    R.isNil,
    R.always(''),
    R.concat('.'),
  )(mime.extension(content_type));
}
