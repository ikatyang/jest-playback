import { PlayAction } from './actions/play';
import { RealAction } from './actions/real';
import { RecordAction } from './actions/record';
import { RunAction } from './actions/run';

export const modeEnv = 'JEST_PLAYBACK_MODE';

export enum Mode {
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

export function getActionClass(mode: Mode) {
  switch (mode) {
    case Mode.Play:
      return PlayAction;
    case Mode.Real:
      return RealAction;
    case Mode.Record:
      return RecordAction;
    case Mode.Run:
      return RunAction;
    default:
      throw new Error(`Unexpected mode "${mode}"`);
  }
}
