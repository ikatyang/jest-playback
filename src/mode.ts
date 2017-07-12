import {Action} from './action';
import {PlayAction, RealAction, RecordAction, RunAction} from './actions/index';

export const enum Mode {
  /**
   * - http: `true`
   * - play: `true`
   * - record: `false`
   */
  Run = 'run',
  /**
   * - http: `false`
   * - play: `true`
   * - record: `false`
   */
  Play = 'play',
  /**
   * - http: `true`
   * - play: `false`
   * - record: `true`
   */
  Record = 'record',
  /**
   * - http: `true`
   * - play: `false`
   * - record: `false`
   */
  Real = 'real',
}

export function mode_to_action(mode: Mode): Action {
  switch (mode) {
    case Mode.Run:
      return new RunAction();
    case Mode.Play:
      return new PlayAction();
    case Mode.Record:
      return new RecordAction();
    case Mode.Real:
      return new RealAction();
    default:
      throw new Error(`Unexpected mode '${mode}'`);
  }
}
