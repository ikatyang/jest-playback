import { Action } from '../action';
import { activate, deactivate, enableNetConnect, playRecord } from '../nock';

export class RunAction extends Action {
  public start() {
    activate();
    enableNetConnect();
    playRecord(this.playbackDir);
  }
  public finish() {
    deactivate();
  }
}
