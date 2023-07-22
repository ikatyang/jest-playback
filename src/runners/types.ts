export interface ExpectStatic {
  (actual: any): Assertion
  getState(): MatcherState
  addSnapshotSerializer(plugin: PrettyFormatPlugin): void
}

interface Assertion {
  toMatchSnapshot(message: string): void
}

interface MatcherState {
  currentTestName?: string
  snapshotState: SnapshotState
}

interface SnapshotState {
  _counters: Map<string, number>
  _snapshotData: SnapshotData
  _updateSnapshot: SnapshotUpdateState
}

type SnapshotUpdateState = 'all' | 'new' | 'none'
type SnapshotData = Record<string, string>

interface PrettyFormatPlugin {
  test: (value: any) => boolean
  print: (value: unknown) => string
}

export abstract class Runner {
  async init() {}
  abstract get expect(): ExpectStatic
  abstract getSnapshotFullName(testName: string, snapshotName: string): string
}
