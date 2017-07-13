import {GlobalConfig, Reporter as ReporterInterface} from 'jest-types';
import * as path from 'path';
import {Action, ActionOptions} from './action';
import {mode_to_action, Mode} from './mode';
import defaults = require('lodash.defaults');

export interface ReporterOptions extends ActionOptions {
  mode: Mode;
  mode_env: string;
}

export class Reporter implements ReporterInterface {

  public global_config: GlobalConfig;
  public options: ReporterOptions;
  public action: Action;

  constructor(global_config: GlobalConfig, options: Partial<ReporterOptions> = {}) {
    this.global_config = global_config;
    this.init_options(options);
    this.init_action();
  }

  public init_action() {
    this.action = mode_to_action(this.options.mode, this.options.mode_env).setup(this.options);
  }

  public init_options(options: Partial<ReporterOptions>) {
    this.options = defaults(options, {
      debug: false,
      mode: Mode.Run,
      mode_env: 'JEST_PLAYBACK_MODE',
      playbacks: '<rootDir>/playbacks',
    });
    this.options.playbacks = path.resolve(
      process.cwd(),
      this.options.playbacks.replace('<rootDir>', this.global_config.rootDir),
    );
  }

  public onRunStart() {
    this.action.start();
  }

  public onRunComplete() {
    this.action.finish();
  }

  public onTestResult() {
    // do nothing
  }

  public onTestStart() {
    // do nothing
  }

  public getLastError() {
    // do nothing
  }

}
