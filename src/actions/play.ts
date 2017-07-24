import { Action } from '../action';
import { disable_net_connect, play_nocks, restore } from '../utils';

export class PlayAction extends Action {
  public start() {
    restore();
    disable_net_connect();
    play_nocks(this.options.playbacks);
  }
  public finish() {
    // do nothing
  }
}
