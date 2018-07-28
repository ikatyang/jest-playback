import { Action } from '../action';
import { activate, deactivate, enableNetConnect } from '../nock';

export class RealAction extends Action {
  public start() {
    activate();
  }
  public finish() {
    deactivate();
  }
}
