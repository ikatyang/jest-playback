import { BatchInterceptor } from '@mswjs/interceptors'
import { ClientRequestInterceptor } from '@mswjs/interceptors/ClientRequest'
import { FetchInterceptor } from '@mswjs/interceptors/fetch'
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest'
import { PlaybackManager } from './manager.js'
import { Options } from './options.js'
import { JestRunner, VitestRunner } from './runners/index.js'

export default async function setup(options?: Options) {
  const runner = getRunner()
  await runner.init()
  const manager = new PlaybackManager(runner, options)
  const interceptor = new BatchInterceptor({
    name: 'interceptor',
    interceptors: [
      new ClientRequestInterceptor(),
      new FetchInterceptor(),
      new XMLHttpRequestInterceptor(),
    ],
  })
  interceptor.apply()
  interceptor.on('request', async ({ request }) => {
    const response = await manager.onRequest(request)
    if (response) {
      request.respondWith(response)
    }
  })
}

function getRunner() {
  if ('JEST_WORKER_ID' in process.env) {
    return new JestRunner()
  }
  if ('VITEST_POOL_ID' in process.env) {
    return new VitestRunner()
  }
  throw new Error('unexpected environment')
}
