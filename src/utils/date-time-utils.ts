const cleanTimeUTCInstant = (utcInstant: number | undefined): string => {
  if (!utcInstant || isNaN(utcInstant)) return ''

  const now = new Date()
  const localDate = new Date(utcInstant)

  // Check if the local date is today
  if (
    localDate.getDate() === now.getDate() &&
    localDate.getMonth() === now.getMonth() &&
    localDate.getFullYear() === now.getFullYear()
  ) {
    // It's today, return in hh:mm format
    const hours = localDate.getHours().toString().padStart(2, '0')
    const minutes = localDate.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  // Check if the local date is yesterday
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (
    localDate.getDate() === yesterday.getDate() &&
    localDate.getMonth() === yesterday.getMonth() &&
    localDate.getFullYear() === yesterday.getFullYear()
  ) {
    // It's yesterday, return "yest"
    return 'yest'
  }

  // For any day prior to yesterday, return in DD/MM format
  const day = localDate.getDate().toString().padStart(2, '0')
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0') // Note: January is 0 in JavaScript
  return `${day}/${month}`
}

export default cleanTimeUTCInstant
