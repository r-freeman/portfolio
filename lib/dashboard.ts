import {getTotalFollowers, getTotalRepos, getTotalStars} from '@/lib/github'
import {getAllArticles} from '@/lib/getAllArticles'
import {getTopArtist, getTopGenre} from '@/lib/spotify'
import {getViews} from '@/lib/views'
import {getStats} from '@/lib/statsfm'
import {Metric} from '@/types'

export async function getDashboardData() {
    const [totalRepos, totalFollowers] = await Promise.all([
        getTotalRepos(),
        getTotalFollowers()
    ])

    const totalStars = await getTotalStars(totalRepos)
    const totalArticles = (await getAllArticles()).length
    const totalArticleViews = (await getViews()).views
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
            title: "Total articles",
            value: +totalArticles,
            group: "Blog",
            href: "/writing"
        },
        {
            title: "Total article views",
            value: +totalArticleViews,
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