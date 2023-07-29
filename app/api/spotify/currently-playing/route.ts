import {NextResponse} from 'next/server'
import {getCurrentlyPlaying} from '@/lib/spotify'

type Song = {
    item: {
        album: {
            name: string
            images: [
                {
                    url: string
                }
            ]
        }
        artists: [
            {
                name: string
            }
        ]
        external_urls: {
            spotify: string
        }
        name: string
    }
    is_playing: boolean
}

export async function GET(request: Request) {
    const response = await getCurrentlyPlaying()

    if (response.status === 204 || response.status > 400) {
        return new Response(JSON.stringify({isPlaying: false}), {
            status: 200
        })
    }

    const song = await response.json() as Song
    const {item} = song

    const artist = item.artists.map(artist => artist.name).join(', ')
    const title = item.name;
    const songUrl = item.external_urls.spotify
    const album = item.album.name
    const albumImageUrl = item.album.images[0].url
    const isPlaying = song.is_playing;

    return NextResponse.json({
        artist,
        title,
        songUrl,
        album,
        albumImageUrl,
        isPlaying
    })
}