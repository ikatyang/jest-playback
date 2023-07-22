import assert from 'node:assert'
import serializerRaw, { wrap } from 'jest-snapshot-serializer-raw'
import { Options, defaultGetRequestCacheKey } from './options.js'
import { fromResponseRecordText, toResponseRecordText } from './records.js'
import { Runner } from './runners/types.js'

const INTERNAL_HEADER = 'X-Jest-Playback-Internal'

export class PlaybackManager {
  constructor(
    private runner: Runner,
    private options: Options = {},
  ) {
    this.runner.expect.addSnapshotSerializer(serializerRaw)
  }

  async onRequest(request: Request): Promise<Response | null> {
    if (this.unwrapInternalRequest(request)) {
      return null // avoid circular interception
    }
    const {
      currentTestName,
      snapshotState: { _counters, _snapshotData, _updateSnapshot },
    } = this.runner.expect.getState()
    if (!currentTestName) {
      return null // outside of test
    }
    const snapshotName = await this.getSnapshotName(request)
    const snapshotFullName = this.runner //
      .getSnapshotFullName(currentTestName, snapshotName)
    const snapshotIndex = _counters.get(snapshotFullName) ?? 0
    const snapshotId = `${snapshotFullName} ${snapshotIndex + 1}`
    const snapshot = _snapshotData[snapshotId]?.replace(/^\n|\n$/g, '') as
      | string
      | undefined
    switch (_updateSnapshot) {
      case 'none':
        assert(snapshot, 'playback not found')
        return await this.play(snapshot, snapshotName)
      case 'new':
        return snapshot
          ? await this.play(snapshot, snapshotName)
          : await this.record(request, snapshotName)
      case 'all':
        return await this.record(request, snapshotName)
      default:
        _updateSnapshot satisfies never
        throw new Error(`Unexpected _updateSnapshot ${_updateSnapshot}`)
    }
  }

  private async play(snapshot: string, name: string) {
    const response = fromResponseRecordText(snapshot)
    return await this.snapshot(response, name)
  }

  private async record(request: Request, name: string) {
    this.wrapInternalRequest(request)
    const response = await fetch(request)
    return await this.snapshot(response, name)
  }

  private async snapshot(response: Response, name: string) {
    this.runner
      .expect(wrap(await toResponseRecordText(response)))
      .toMatchSnapshot(name)
    return response
  }

  private wrapInternalRequest(request: Request) {
    request.headers.set(INTERNAL_HEADER, '')
  }

  private unwrapInternalRequest(request: Request) {
    if (!request.headers.has(INTERNAL_HEADER)) {
      return false
    }
    request.headers.delete(INTERNAL_HEADER)
    return true
  }

  private async getSnapshotName(request: Request) {
    const { getRequestCacheKey = defaultGetRequestCacheKey } = this.options
    return `(jest-playback) ${await getRequestCacheKey(request)}`
  }
}
