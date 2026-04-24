export const formatSrsDate = (date: string | Date | null) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export const formatSrsDuration = (min: number | null) => {
  if (min === null || min <= 0) return ''
  return `${min}p`
}

export const formatSrsRemainingTime = (seconds: number) => {
  if (seconds < 0) return '00 phút 00 giây'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')

  if (h > 0) {
    return `${h} giờ ${mm} phút ${ss} giây`
  }
  return `${mm} phút ${ss} giây`
}

export const formatSrsScore = (score: number | null) => {
  if (score === null || score < 0 || score > 10) return ''
  // Format as float (8, 8.5)
  return score % 1 === 0 ? score.toString() : score.toFixed(1).replace('.', ',')
}

export const truncateSrsText = (text: string | null) => {
  if (!text) return ''
  if (text.length > 200) return text.substring(0, 200) + '...'
  return text
}
