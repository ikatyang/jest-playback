import {Script} from 'vm';
import {ProjectConfig} from './Config';
import {Global} from './Global';

// import {ModuleMocker} from 'jest-mock';
type ModuleMocker = any;

interface FakeTimers {
  clearAllTimers(): void;
  runAllImmediates(): void;
  runAllTicks(): void;
  runAllTimers(): void;
  runTimersToTime(msToRun: number): void;
  runOnlyPendingTimers(): void;
  runWithRealTimers(callback: any): void;
  useFakeTimers(): void;
  useRealTimers(): void;
}

declare class $JestEnvironment {
  public global: Global;
  public fakeTimers: FakeTimers;
  public testFilePath: string;
  public moduleMocker: ModuleMocker;

  constructor(config: ProjectConfig);

  public dispose(): void;
  public runScript(script: Script): any;
}

export type Environment = $JestEnvironment;
export type EnvironmentClass = typeof $JestEnvironment;
