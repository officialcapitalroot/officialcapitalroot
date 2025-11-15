// export function formatDisplayDuration(isoDuration) {
//   // Convert ISO 8601 duration (PT15M30S) to display format (15:30)
//   if (!isoDuration) return '0:00'
  
//   // Remove PT prefix
//   const time = isoDuration.replace('PT', '')
  
//   let hours = 0
//   let minutes = 0
//   let seconds = 0
  
//   // Extract hours
//   const hoursMatch = time.match(/(\d+)H/)
//   if (hoursMatch) hours = parseInt(hoursMatch[1])
  
//   // Extract minutes
//   const minutesMatch = time.match(/(\d+)M/)
//   if (minutesMatch) minutes = parseInt(minutesMatch[1])
  
//   // Extract seconds
//   const secondsMatch = time.match(/(\d+)S/)
//   if (secondsMatch) seconds = parseInt(secondsMatch[1])
  
//   // Format based on presence of hours
//   if (hours > 0) {
//     return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
//   } else {
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`
//   }
// }

// // For backward compatibility - handles both ISO and existing formats
// export function getDisplayDuration(duration) {
//   if (duration.includes('PT')) {
//     return formatDisplayDuration(duration)
//   }
//   return duration // Already in display format
// }






export function formatDisplayDuration(isoDuration) {
  if (!isoDuration) return '0:00'
  
  const time = isoDuration.replace('PT', '')
  
  let hours = 0
  let minutes = 0
  let seconds = 0
  
  const hoursMatch = time.match(/(\d+)H/)
  if (hoursMatch) hours = parseInt(hoursMatch[1])
  
  const minutesMatch = time.match(/(\d+)M/)
  if (minutesMatch) minutes = parseInt(minutesMatch[1])
  
  const secondsMatch = time.match(/(\d+)S/)
  if (secondsMatch) seconds = parseInt(secondsMatch[1])
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
}

export function getDisplayDuration(duration) {
  if (!duration) return '0:00'
  if (typeof duration !== 'string') return '0:00'
  if (duration.includes('PT')) {
    return formatDisplayDuration(duration)
  }
  return duration
}