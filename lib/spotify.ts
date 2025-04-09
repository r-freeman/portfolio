import fetch from 'node-fetch'

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN
const SPOTIFY_TOKEN = 'https://accounts.spotify.com/api/token'
const SPOTIFY_CURRENTLY_PLAYING = 'https://api.spotify.com/v1/me/player/currently-playing'
const SPOTIFY_RECENTLY_PLAYED = 'https://api.spotify.com/v1/me/player/recently-played'

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')

type Response = {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token: string
}

const getAccessToken = async () => {
    const response = await fetch(SPOTIFY_TOKEN, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': `${SPOTIFY_REFRESH_TOKEN}`
        })
    })

    return response.json()
}

export const getCurrentlyPlaying = async () => {
    const {access_token}: Response = await getAccessToken() as Response

    return await fetch(SPOTIFY_CURRENTLY_PLAYING, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}


export const getRecentlyPlayed = async () => {
    try {
        const {access_token}: Response = await getAccessToken() as Response
    } catch(e) {
        console.error(e)
        return null
    }
        
    return await fetch(SPOTIFY_RECENTLY_PLAYED, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
}
