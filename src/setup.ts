import * as path from 'path';
import { getActionClass, Mode, modeEnv } from './mode';

export function setup(
  dirname: string,
  mode = (process.env[modeEnv] as Mode) || Mode.Run,
) {
  const playbackDir = path.join(dirname, '__playbacks__');

  const Action = getActionClass(mode);
  const action = new Action(playbackDir);

  beforeAll(() => action.start());
  afterAll(() => action.finish());
}
