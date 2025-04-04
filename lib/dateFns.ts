import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInMonths,
    differenceInSeconds,
    differenceInWeeks,
    differenceInYears
} from 'date-fns'

export function getShortDurationFromNow(fromDateTime: string) {
    const to = new Date()

    const units = [
        {fn: differenceInYears, suffix: 'y'},
        {fn: differenceInMonths, suffix: 'mo'},
        {fn: differenceInWeeks, suffix: 'w'},
        {fn: differenceInDays, suffix: 'd'},
        {fn: differenceInHours, suffix: 'h'},
        {fn: differenceInMinutes, suffix: 'm'},
        {fn: differenceInSeconds, suffix: 's'}
    ]

    for (const {fn, suffix} of units) {
        const diff = fn(to, fromDateTime)
        if (Math.abs(diff) >= 1) {
            return `${Math.abs(diff)}${suffix}`
        }
    }

    return '0s'
}
