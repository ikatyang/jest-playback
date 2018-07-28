import nock = require('nock');
import { loadRecords, writeRecords } from './record';

export function activate() {
  if (!nock.isActive()) {
    nock.activate();
  }
}

export function deactivate() {
  nock.restore();
  nock.cleanAll();
}

export function enableNetConnect() {
  nock.enableNetConnect();
}

export function disableNetConnect() {
  nock.disableNetConnect();
}

export function startRecord() {
  nock.recorder.rec({
    output_objects: true,
    dont_print: true,
  });
}

export function finishRecord(playbackDir: string) {
  const records = nock.recorder.play() as nock.NockDefinition[];
  writeRecords(playbackDir, records);
  nock.recorder.clear();
}

export function playRecord(playbackDir: string) {
  const records = loadRecords(playbackDir).map(record => ({
    ...record,
    options: { ...record.options, allowUnmocked: true },
  }));
  nock.define(records).forEach(scope => scope.persist());
}
