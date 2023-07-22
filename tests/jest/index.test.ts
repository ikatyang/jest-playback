import setupPlayback from '../../src/index.js'
import { getEmojis } from '../__helpers__/index.js'

await setupPlayback()

test('emoji api', async () => {
  expect(await getEmojis()).toMatchSnapshot()
})
