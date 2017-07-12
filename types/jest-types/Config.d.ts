export type Path = string;
export type Glob = string;

export interface HasteConfig {
  defaultPlatform?: void | string;
  hasteImplModulePath?: string;
  platforms?: string[];
  providesModuleNodeModules: string[];
}

export type ReporterConfig = [string, object];

export type ConfigGlobals = object;

export interface DefaultOptions {
  automock: boolean;
  bail: boolean;
  browser: boolean;
  cache: boolean;
  cacheDirectory: Path;
  clearMocks: boolean;
  coveragePathIgnorePatterns: string[];
  coverageReporters: string[];
  expand: boolean;
  globals: ConfigGlobals;
  haste: HasteConfig;
  mapCoverage: boolean;
  moduleDirectories: string[];
  moduleFileExtensions: string[];
  moduleNameMapper: {[key: string]: string};
  modulePathIgnorePatterns: string[];
  noStackTrace: boolean;
  notify: boolean;
  preset: void | string;
  resetMocks: boolean;
  resetModules: boolean;
  snapshotSerializers: Path[];
  testEnvironment: string;
  testMatch: Glob[];
  testPathIgnorePatterns: string[];
  testRegex: string;
  testResultsProcessor: void | string;
  testURL: string;
  timers: 'real' | 'fake';
  transformIgnorePatterns: Glob[];
  useStderr: boolean;
  verbose: void | boolean;
  watch: boolean;
  watchman: boolean;
}

export interface InitialOptions {
  automock?: boolean;
  bail?: boolean;
  browser?: boolean;
  cache?: boolean;
  cacheDirectory?: Path;
  clearMocks?: boolean;
  collectCoverage?: boolean;
  collectCoverageFrom?: Glob[];
  collectCoverageOnlyFrom?: {[key: string]: boolean};
  coverageDirectory?: string;
  coveragePathIgnorePatterns?: string[];
  coverageReporters?: string[];
  coverageThreshold?: {global: {[key: string]: number}};
  expand?: boolean;
  forceExit?: boolean;
  globals?: ConfigGlobals;
  haste?: HasteConfig;
  reporters?: (ReporterConfig | string)[];
  logHeapUsage?: boolean;
  mapCoverage?: boolean;
  moduleDirectories?: string[];
  moduleFileExtensions?: string[];
  moduleLoader?: Path;
  moduleNameMapper?: {[key: string]: string};
  modulePathIgnorePatterns?: string[];
  modulePaths?: string[];
  name?: string;
  noStackTrace?: boolean;
  notify?: boolean;
  preprocessorIgnorePatterns?: Glob[];
  preset?: void | string;
  projects: void | Glob[];
  replname?: void | string;
  resetMocks?: boolean;
  resetModules?: boolean;
  resolver?: void | Path;
  rootDir: Path;
  roots?: Path[];
  scriptPreprocessor?: string;
  setupFiles?: Path[];
  setupTestFrameworkScriptFile?: Path;
  silent?: boolean;
  skipNodeResolution: boolean;
  snapshotSerializers?: Path[];
  testEnvironment?: string;
  testMatch?: Glob[];
  testNamePattern?: string;
  testPathIgnorePatterns?: string[];
  testRegex?: string;
  testResultsProcessor?: void | string;
  testRunner?: string;
  testURL?: string;
  timers?: 'real' | 'fake';
  transform?: {[key: string]: string};
  transformIgnorePatterns?: Glob[];
  unmockedModulePathPatterns?: string[];
  updateSnapshot?: boolean;
  useStderr?: boolean;
  verbose?: void | boolean;
  watch?: boolean;
  watchman?: boolean;
}

export type SnapshotUpdateState = 'all' | 'new' | 'none';

export interface GlobalConfig {
  bail: boolean;
  collectCoverage: boolean;
  collectCoverageFrom: Glob[];
  collectCoverageOnlyFrom: void | {[key: string]: boolean};
  coverageDirectory: string;
  coverageReporters: string[];
  coverageThreshold: {global: {[key: string]: number}};
  expand: boolean;
  forceExit: boolean;
  logHeapUsage: boolean;
  mapCoverage: boolean;
  noStackTrace: boolean;
  notify: boolean;
  projects: Glob[];
  replname: void | string;
  reporters: ReporterConfig[];
  rootDir: Path;
  silent: boolean;
  testNamePattern: string;
  testPathPattern: string;
  testResultsProcessor: void | string;
  updateSnapshot: SnapshotUpdateState;
  useStderr: boolean;
  verbose: void | boolean;
  watch: boolean;
  watchman: boolean;
}

export interface ProjectConfig {
  automock: boolean;
  browser: boolean;
  cache: boolean;
  cacheDirectory: Path;
  clearMocks: boolean;
  coveragePathIgnorePatterns: string[];
  globals: ConfigGlobals;
  haste: HasteConfig;
  moduleDirectories: string[];
  moduleFileExtensions: string[];
  moduleLoader: Path;
  moduleNameMapper: [string, string][];
  modulePathIgnorePatterns: string[];
  modulePaths: string[];
  name: string;
  resetMocks: boolean;
  resetModules: boolean;
  resolver: void | Path;
  rootDir: Path;
  roots: Path[];
  setupFiles: Path[];
  setupTestFrameworkScriptFile: Path;
  skipNodeResolution: boolean;
  snapshotSerializers: Path[];
  testEnvironment: string;
  testMatch: Glob[];
  testPathIgnorePatterns: string[];
  testRegex: string;
  testRunner: string;
  testURL: string;
  timers: 'real' | 'fake';
  transform: [string, Path][];
  transformIgnorePatterns: Glob[];
  unmockedModulePathPatterns: void | string[];
}
