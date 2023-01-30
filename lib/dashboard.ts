import {getTotalFollowers, getTotalRepos, getTotalStars} from '@/lib/github'
import {getAllArticles} from '@/lib/getAllArticles'
import {getViews} from '@/lib/views'
import {getLocalData} from '@/lib/localData'
import {Metric} from '@/types'

export async function getDashboardData() {
    const [totalRepos, totalFollowers] = await Promise.all([
        getTotalRepos(),
        getTotalFollowers()
    ])

    const totalStars = await getTotalStars(totalRepos)
    const totalArticles = (await getAllArticles()).length
    const totalArticleViews = (await getViews()).views
    const {statsfm} = JSON.parse(await getLocalData())

    const metrics: Metric[] = [
        {
            title: "Top genre",
            value: statsfm.top_genre,
            group: "Spotify",
            href: "https://spotify.com/"
        },
        {
            title: "Top artist",
            value: statsfm.top_artist,
            group: "Spotify",
            href: "https://spotify.com/"
        },
        {
            title: "Repos",
            value: totalRepos,
            group: "GitHub",
            href: "https://github.com/r-freeman?tab=repositories"
        },
        {
            title: "Followers",
            value: totalFollowers,
            group: "GitHub",
            href: "https://github.com/r-freeman?tab=followers"
        },
        {
            title: "Stars",
            value: totalStars,
            group: "GitHub",
            href: "https://github.com/r-freeman/"
        },
        {
            title: "Total articles",
            value: totalArticles,
            group: "Website",
            href: "/writing"
        },
        {
            title: "Total article views",
            value: totalArticleViews,
            group: "Website",
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