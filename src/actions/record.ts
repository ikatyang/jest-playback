import {Action} from '../action';
import {enable_net_connect, finish_record, play_nocks, restore, start_record} from '../utils';

export class RecordAction extends Action {
  public start() {
    restore();
    enable_net_connect();
    start_record();
  }
  public finish() {
    finish_record(this.options.playbacks);
  }
}
