export async function getEmojis() {
  const response = await fetch('https://api.github.com/emojis', {
    headers: { 'User-Agent': 'https://github.com/ikatyang/jest-playback' },
  })
  return await response.json()
}
