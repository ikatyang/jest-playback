import { ExpectStatic, Runner } from './types.js'

const SEPARATOR = ' > '

export class VitestRunner extends Runner {
  public expect!: ExpectStatic

  override async init() {
    const { expect } = await import('vitest')
    this.expect = expect as unknown as ExpectStatic
  }

  getSnapshotFullName(testName: string, snapshotName: string) {
    return [...testName.split(SEPARATOR).slice(1), snapshotName].join(SEPARATOR)
  }
}
