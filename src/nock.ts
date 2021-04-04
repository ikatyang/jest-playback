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

export function enableNetConnect(matcher?: string | RegExp | ((host: string) => boolean)) {
  nock.enableNetConnect(matcher);
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
  const records = nock.recorder.play() as nock.Definition[];
  writeRecords(playbackDir, records);
  nock.recorder.clear();
}

export function playRecord(playbackDir: string, allowUnmocked: boolean) {
  const records = loadRecords(playbackDir);

  for (const record of records) {
    record.options = { ...record.options, allowUnmocked };
  }

  nock.define(records).forEach(scope => scope.persist());
}
