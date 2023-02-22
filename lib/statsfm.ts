import fetcher from './fetcher'

const STATSFM_USERNAME = process.env.STATSFM_USERNAME
const STATSFM_LIFETIME_STATS = `https://beta-api.stats.fm/api/v1/users/${STATSFM_USERNAME}/streams/stats?range=lifetime`

type StatsFmResponse = {
    items: {
        durationMs: number
        count: number
    }
}

export const getStats = async () => {
    const response = await fetcher(STATSFM_LIFETIME_STATS, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }) as StatsFmResponse

    const {durationMs} = response.items
    const hoursListened = (durationMs / 3_600_000).toFixed(0)
    const minutesListened = (durationMs / 60_000).toFixed(0)
    const streams = response.items.count

    return {
        hoursListened,
        minutesListened,
        streams
    }
}