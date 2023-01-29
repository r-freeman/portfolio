import {getTotalFollowers, getTotalRepos, getTotalStars} from '@/lib/github'
import {getAllArticles} from '@/lib/getAllArticles'
import {getViews} from '@/lib/views'

export async function dashboard() {
    const [totalRepos, totalFollowers] = await Promise.all([
        getTotalRepos(),
        getTotalFollowers()
    ])

    const totalStars = await getTotalStars(totalRepos)
    const totalArticles = (await getAllArticles()).length
    const totalArticleViews = (await getViews()).views

    return [
        {
            title: "GitHub Repos",
            metric: totalRepos,
            href: "https://github.com/r-freeman?tab=repositories"
        },
        {
            title: "GitHub Followers",
            metric: totalFollowers,
            href: "https://github.com/r-freeman?tab=followers"
        },
        {
            title: "GitHub Stars",
            metric: totalStars,
            href: "https://github.com/r-freeman/"
        },
        {
            title: "Total Articles",
            metric: totalArticles,
            href: "/writing"
        },
        {
            title: "Total Article Views",
            metric: totalArticleViews,
            href: "/writing"
        }
    ]
}