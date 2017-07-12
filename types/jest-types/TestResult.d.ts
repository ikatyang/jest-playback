import {ConsoleBuffer} from './Console';

export interface RawFileCoverage {
  path: string;
  s: {[statementId: number]: number};
  b: {[branchId: number]: number};
  f: {[functionId: number]: number};
  l: {[lineId: number]: number};
  fnMap: {[functionId: number]: any};
  statementMap: {[statementId: number]: any};
  branchMap: {[branchId: number]: any};
  inputSourceMap?: object;
}

export interface RawCoverage {
  [filePath: string]: RawFileCoverage;
}

interface FileCoverageTotal {
  total: number;
  covered: number;
  skipped: number;
  pct?: number;
}

interface CoverageSummary {
  lines: FileCoverageTotal;
  statements: FileCoverageTotal;
  branches: FileCoverageTotal;
  functions: FileCoverageTotal;
}

export interface FileCoverage {
  getLineCoverage: () => object;
  getUncoveredLines: () => number[];
  getBranchCoverageByLine: () => object;
  toJSON: () => object;
  merge: (other: object) => void;
  computeSimpleTotals: (property: string) => FileCoverageTotal;
  computeBranchTotals: () => FileCoverageTotal;
  resetHits: () => void;
  toSummary: () => CoverageSummary;
}

export interface CoverageMap {
  merge: (data: object) => void;
  getCoverageSummary: () => FileCoverage;
  data: RawCoverage;
  addFileCoverage: (fileCoverage: RawFileCoverage) => void;
  files: () => string[];
  fileCoverageFor: (file: string) => FileCoverage;
}

export interface SerializableError {
  code?: any;
  message: string;
  stack: void | string;
  type?: string;
}

export interface FailedAssertion {
  matcherName: string;
  message?: string;
  actual?: any;
  pass?: boolean;
  expected?: any;
  isNot?: boolean;
  stack?: string;
}

export type Status = 'passed' | 'failed' | 'skipped' | 'pending';

export type Bytes = number;
export type Milliseconds = number;

export interface AssertionResult {
  ancestorTitles: string[];
  duration?: void | Milliseconds;
  failureMessages: string[];
  fullName: string;
  numPassingAsserts: number;
  status: Status;
  title: string;
}

export interface FormattedAssertionResult {
  status: Status;
  title: string;
  failureMessages: string[] | null;
}

export interface AggregatedResult {
  coverageMap?: void | CoverageMap;
  numFailedTests: number;
  numFailedTestSuites: number;
  numPassedTests: number;
  numPassedTestSuites: number;
  numPendingTests: number;
  numPendingTestSuites: number;
  numRuntimeErrorTestSuites: number;
  numTotalTests: number;
  numTotalTestSuites: number;
  snapshot: SnapshotSummary;
  startTime: number;
  success: boolean;
  testResults: TestResult[];
  wasInterrupted: boolean;
}

export interface Suite {
  title: string;
  suites: Suite[];
  tests: AssertionResult[];
}

export interface TestResult {
  console: void | ConsoleBuffer;
  coverage?: RawCoverage;
  memoryUsage?: Bytes;
  failureMessage: void | string;
  numFailingTests: number;
  numPassingTests: number;
  numPendingTests: number;
  perfStats: {
    end: Milliseconds,
    start: Milliseconds,
  };
  skipped: boolean;
  snapshot: {
    added: number,
    fileDeleted: boolean,
    matched: number,
    unchecked: number,
    unmatched: number,
    updated: number,
  };
  sourceMaps: {[sourcePath: string]: string};
  testExecError?: SerializableError;
  testFilePath: string;
  testResults: AssertionResult[];
}

export interface FormattedTestResult {
  message: string;
  name: string;
  summary: string;
  status: 'failed' | 'passed';
  startTime: number;
  endTime: number;
  coverage: any;
  assertionResults: FormattedAssertionResult[];
}

export interface FormattedTestResults {
  coverageMap?: void | CoverageMap;
  numFailedTests: number;
  numFailedTestSuites: number;
  numPassedTests: number;
  numPassedTestSuites: number;
  numPendingTests: number;
  numPendingTestSuites: number;
  numRuntimeErrorTestSuites: number;
  numTotalTests: number;
  numTotalTestSuites: number;
  snapshot: SnapshotSummary;
  startTime: number;
  success: boolean;
  testResults: FormattedTestResult[];
  wasInterrupted: boolean;
}

export type CodeCoverageReporter = any;

export type CodeCoverageFormatter = (
  coverage: void | RawCoverage,
  reporter?: CodeCoverageReporter,
) => void | object;

export interface SnapshotSummary {
  added: number;
  didUpdate: boolean;
  failure: boolean;
  filesAdded: number;
  filesRemoved: number;
  filesUnmatched: number;
  filesUpdated: number;
  matched: number;
  total: number;
  unchecked: number;
  unmatched: number;
  updated: number;
}
