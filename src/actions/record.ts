import { Action } from '../action';
import {
  activate,
  deactivate,
  enableNetConnect,
  finishRecord,
  startRecord,
} from '../nock';

export class RecordAction extends Action {
  public start() {
    activate();
    enableNetConnect();
    startRecord();
  }
  public finish() {
    finishRecord(this.playbackDir);
    deactivate();
  }
}
