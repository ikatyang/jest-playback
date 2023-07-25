export enum Mode {
  /**
   * - `Mode.Update` if Jest `--update-snapshot` flag specified
   * - `Mode.Play` if Jest `--ci` flag specified
   * - `Mode.Record` otherwise
   */
  Auto = 'auto',
  /**
   * - all requests are recorded
   */
  Update = 'update',
  /**
   * - play records
   * - new requests are blocked
   */
  Play = 'play',
  /**
   * - play records
   * - new requests are recorded
   */
  Record = 'record',
}
