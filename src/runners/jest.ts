import { ExpectStatic, Runner } from './types.js'

const SEPARATOR = ': '

export class JestRunner extends Runner {
  public expect!: ExpectStatic

  override async init() {
    this.expect = expect as unknown as ExpectStatic
  }

  getSnapshotFullName(testName: string, snapshotName: string) {
    return [testName, snapshotName].join(SEPARATOR)
  }
}
