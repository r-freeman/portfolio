import fetch from 'node-fetch'

const STATSFM_USERNAME = process.env.STATSFM_USERNAME
const STATSFM_LIFETIME_STATS = `https://beta-api.stats.fm/api/v1/users/${STATSFM_USERNAME}/streams/stats?range=lifetime`

type StatsFmResponse = {
    items: {
        durationMs: number
    }
}

export const getStats = async () => {
    const response = await fetch(STATSFM_LIFETIME_STATS, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(r => r.json()) as StatsFmResponse

    const minutesListened = ((response.items.durationMs / 1000) / 60).toFixed(0)

    return {
        minutesListened
    }
}