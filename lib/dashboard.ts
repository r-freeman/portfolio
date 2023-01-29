import {getTotalFollowers, getTotalRepos, getTotalStars} from '@/lib/github'
import {getAllArticles} from '@/lib/getAllArticles'
import {getViews} from '@/lib/views'

export async function getDashboardData() {
    const [totalRepos, totalFollowers] = await Promise.all([
        getTotalRepos(),
        getTotalFollowers()
    ])

    const totalStars = await getTotalStars(totalRepos)
    const totalArticles = (await getAllArticles()).length
    const totalArticleViews = (await getViews()).views

    const data = [
        {
            title: "Repos",
            metric: totalRepos,
            group: "GitHub",
            href: "https://github.com/r-freeman?tab=repositories"
        },
        {
            title: "Followers",
            metric: totalFollowers,
            group: "GitHub",
            href: "https://github.com/r-freeman?tab=followers"
        },
        {
            title: "Stars",
            metric: totalStars,
            group: "GitHub",
            href: "https://github.com/r-freeman/"
        },
        {
            title: "Total Articles",
            metric: totalArticles,
            group: "Website",
            href: "/writing"
        },
        {
            title: "Total Article Views",
            metric: totalArticleViews,
            group: "Website",
            href: "/writing"
        }
    ]

    const groups = data.reduce((acc, item) => {
        // @ts-ignore
        (acc[item.group] = acc[item.group] || []).push(item);
        return acc;
    }, {})

    return Object.entries(groups).map(([groupName, groupItems]) => {
        return {groupName, groupItems}
    })
}