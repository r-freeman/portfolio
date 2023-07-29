import {NextResponse} from 'next/server'
import {getRecentlyPlayed} from '@/lib/spotify'

type Tracks = {
    items: [
        {
            track: {
                name: string
                artists: [
                    {
                        name: string
                    }
                ]
                external_urls: {
                    spotify: string
                }
                album: {
                    name: string
                    images: [
                        {
                            url: string
                        }
                    ]
                }
            }
            played_at: string
        }
    ]
}

export async function GET(request: Request) {
    const response = await getRecentlyPlayed()

    if (response.status > 400) {
        return new Response(JSON.stringify({status: response.statusText}), {
            status: response.status
        })
    }

    const tracks = await response.json() as Tracks
    const {track} = tracks.items.reduce((r, a) => r.played_at > a.played_at ? r : a)

    const title = track.name;
    const artist = track.artists.map(artist => artist.name).join(', ')
    const songUrl = track.external_urls.spotify
    const album = track.album.name
    const albumImageUrl = track.album.images[0].url

    return NextResponse.json({
        artist,
        title,
        songUrl,
        album,
        albumImageUrl
    })
}