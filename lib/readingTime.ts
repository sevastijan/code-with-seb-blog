export function calculateReadingTime(text: string) {
  const wordsPerMinute = 200
  const numberOfWords = text.trim().split(/\s+/).length
  const minutes = Math.ceil(numberOfWords / wordsPerMinute)
  return minutes
}
