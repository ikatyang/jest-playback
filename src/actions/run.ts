import {Action} from '../action';
import {enable_net_connect, play_nocks, restore} from '../utils';

export class RunAction extends Action {
  public start() {
    restore();
    enable_net_connect();
    play_nocks(this.options.playbacks);
  }
  public finish() {
    // do nothing
  }
}
