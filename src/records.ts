import { Buffer } from 'node:buffer'
import * as mimeTypes from 'mime-types'

interface ResponseRecord extends BodyRecord {
  status: number
  statusText: string
  headers: [name: string, value: string][]
}

enum BodyType {
  None = 'NONE',
  Text = 'TEXT',
  Binary = 'BINARY',
}

interface BodyRecord {
  bodyType: BodyType
  body: string
}

export async function toResponseRecordText(response: Response) {
  const record = await toResponseRecord(response)
  const startLine =
    `${record.bodyType}/${record.headers.length} ${record.status} ${record.statusText}`.trimEnd()
  const headerLines = record.headers.map(([k, v]) => `${k}: ${v}`.trimEnd())
  switch (record.bodyType) {
    case BodyType.None:
      return [startLine, ...headerLines].join('\n')
    case BodyType.Text:
    case BodyType.Binary:
      return [startLine, ...headerLines, record.body].join('\n')
  }
}

async function toResponseRecord(response: Response): Promise<ResponseRecord> {
  const { status, statusText } = response
  const headers = [...response.headers.entries()]
  const bodyRecord = await toBodyRecord(response)
  return { ...bodyRecord, status, statusText, headers }
}

export function fromResponseRecordText(text: string): Response {
  const [startLine, ...lines] = text.split('\n')
  const [, rawBodyType, rawHeaderLength, rawStatus, statusText] =
    startLine.match(/^([A-Z]+)\/(\d+) (\d+) ?(.*)$/)!
  const bodyType = rawBodyType as BodyType
  const headerLength = Number.parseInt(rawHeaderLength)
  const status = Number.parseInt(rawStatus)
  const headers = lines.slice(0, headerLength).map((_): [string, string] => {
    const index = _.indexOf(':')
    return [_.slice(0, index).trim(), _.slice(index + 1).trim()]
  })
  const body = lines.slice(headerLength).join('\n')
  return fromResponseRecord({ status, statusText, headers, bodyType, body })
}

function fromResponseRecord(record: ResponseRecord): Response {
  const { status, statusText, headers } = record
  const body = fromBodyRecord(record)
  return new Response(body, { status, statusText, headers })
}

async function toBodyRecord(body: Response): Promise<BodyRecord> {
  const contentType = body.headers.get('Content-Type')
  if (contentType && isTextEncoding(contentType)) {
    const text = await body.clone().text()
    return text
      ? { bodyType: BodyType.Text, body: text }
      : { bodyType: BodyType.None, body: '' }
  }
  const binary = Buffer.from(await body.clone().arrayBuffer()) //
    .toString('base64')
  return binary
    ? { bodyType: BodyType.Binary, body: binary }
    : { bodyType: BodyType.None, body: '' }
}

function fromBodyRecord(record: BodyRecord): BodyInit | null {
  switch (record.bodyType) {
    case BodyType.None:
      return null
    case BodyType.Text:
      return record.body
    case BodyType.Binary:
      return Buffer.from(record.body, 'base64')
    default:
      return record.bodyType satisfies never
  }
}

function isTextEncoding(contentType: string) {
  return (
    contentType.startsWith('text/') ||
    mimeTypes.charset(contentType) === 'UTF-8'
  )
}
