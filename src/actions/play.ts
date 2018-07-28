import { Action } from '../action';
import { activate, deactivate, disableNetConnect, playRecord } from '../nock';

export class PlayAction extends Action {
  public start() {
    activate();
    disableNetConnect();
    playRecord(this.playbackDir);
  }
  public finish() {
    deactivate();
  }
}
