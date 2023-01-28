import {getTotalFollowers, getTotalRepos, getTotalStars} from '@/lib/github'
import {getAllArticles} from '@/lib/getAllArticles'
import {getViews} from '@/lib/views'

export async function dashboard() {
    const [totalRepos, totalFollowers] = await Promise.all([
        getTotalRepos(),
        getTotalFollowers()
    ])

    const totalStars = await getTotalStars(totalRepos)
    const articles = await getAllArticles()
    const {views} = await getViews()

    return [
        {
            title: "GitHub Repos",
            total: totalRepos,
            href: "https://github.com/r-freeman/"
        },
        {
            title: "GitHub Followers",
            total: totalFollowers,
            href: "https://github.com/r-freeman/"
        },
        {
            title: "GitHub Stars",
            total: totalStars,
            href: "https://github.com/r-freeman/"
        },
        {
            title: "Total Articles",
            total: articles.length,
            href: "/writing"
        },
        {
            title: "Total Article Views",
            total: views,
            href: "/writing"
        }
    ]
}