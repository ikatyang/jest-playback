import {GlobalConfig, Path, ProjectConfig} from './Config';
import {Context} from './Context';
import {Environment} from './Environment';
import {ReporterOnStartOptions} from './Reporters';
import {AggregatedResult, TestResult} from './TestResult';

// import Runtime from 'jest-runtime';
type Runtime = any;

export interface Test {
  context: Context;
  duration?: number;
  path: Path;
}

export interface Reporter {
  onTestResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult): void;
  onRunStart(results: AggregatedResult, options: ReporterOnStartOptions): void;
  onTestStart(test: Test): void;
  onRunComplete(contexts: Set<Context>, results: AggregatedResult): void | Promise<void>;
  getLastError(): void | Error;
}

export type TestFramework = (
  globalConfig: GlobalConfig,
  config: ProjectConfig,
  environment: Environment,
  runtime: Runtime,
  testPath: string,
) => Promise<TestResult>;
