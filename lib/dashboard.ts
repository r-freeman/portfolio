import {cookies} from 'next/headers'
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {getTopRepo, getTotalFollowers, getTotalForks, getTotalRepos, getTotalStars} from '@/lib/github'
import {getAllArticles} from '@/lib/getAllArticles'
import {getTopArtist, getTopGenre} from '@/lib/spotify'
import {Metric} from '@/types'
import {getStats} from "@/lib/statsfm";

export async function getDashboardData() {
    const supabase = createServerComponentClient({cookies})
    const {data: views} = await supabase.rpc('total_views')
    const [totalRepos, totalFollowers] = await Promise.all([
        getTotalRepos(),
        getTotalFollowers()
    ])

    const topRepo = await getTopRepo()
    const totalStars = await getTotalStars(totalRepos)
    const totalForks = await getTotalForks(totalRepos)
    const totalArticles = (await getAllArticles()).length
    const topArtist = await getTopArtist()
    const {genre} = await getTopGenre()
    const {hoursListened, minutesListened, streams} = await getStats()

    const metrics: Metric[] = [
        {
            title: "Streams",
            value: +streams,
            group: "Spotify",
            href: "https://open.spotify.com/?"
        },
        {
            title: "Hours listened",
            value: +hoursListened,
            group: "Spotify",
            href: "https://open.spotify.com/?"
        },
        {
            title: "Minutes listened",
            value: +minutesListened,
            group: "Spotify",
            href: "https://open.spotify.com/?"
        },
        {
            title: "Top genre",
            value: genre,
            group: "Spotify",
            href: "https://open.spotify.com/?"
        },
        {
            title: "Top artist",
            value: topArtist.artist,
            group: "Spotify",
            href: topArtist.uri
        },
        {
            title: "Repos",
            value: +totalRepos,
            group: "GitHub",
            href: "https://github.com/r-freeman?tab=repositories"
        },
        {
            title: "Top repo",
            value: topRepo.name,
            group: "GitHub",
            href: topRepo.url
        },
        {
            title: "Followers",
            value: +totalFollowers,
            group: "GitHub",
            href: "https://github.com/r-freeman?tab=followers"
        },
        {
            title: "Stars",
            value: +totalStars,
            group: "GitHub",
            href: "https://github.com/r-freeman/"
        },
        {
            title: "Forks",
            value: +totalForks,
            group: "GitHub",
            href: "https://github.com/r-freeman/"
        },
        {
            title: "Total articles",
            value: +totalArticles,
            group: "Blog",
            href: "/writing"
        },
        {
            title: "Total article views",
            value: +views,
            group: "Blog",
            href: "/writing"
        }
    ]

    // sort metrics into named groups
    const groups = metrics.reduce((acc: { [key: string]: Metric[] }, item) => {
        (acc[item.group] = acc[item.group] || []).push(item);
        return acc
    }, {} as { [key: string]: Metric[] })

    return Object.entries(groups).map(([groupName, groupItems]) => {
        return {groupName, groupItems}
    })
}