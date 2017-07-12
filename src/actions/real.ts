import {Action} from '../action';
import {enable_net_connect, restore} from '../utils';

export class RealAction extends Action {
  public start() {
    restore();
    enable_net_connect();
  }
  public finish() {
    // do nothing
  }
}
