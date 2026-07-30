export function toApiDateTime(datetimeLocalValue) {
    if (!datetimeLocalValue) return null
    return `${datetimeLocalValue}:00`
}

export function toDatetimeLocalValue(isoValue) {
    if (!isoValue) return ''
    return isoValue.slice(0, 16)
}

export function formatDeadline(isoValue) {
    if (!isoValue) return 'No deadline'
    return new Date(isoValue).toLocaleString()
}
