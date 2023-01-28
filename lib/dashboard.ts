import {getTotalFollowers, getTotalRepos, getTotalStars} from '@/lib/github'

export async function dashboard() {
    const [totalRepos, totalFollowers] = await Promise.all([
        getTotalRepos(),
        getTotalFollowers()
    ])

    const totalStars = await getTotalStars(totalRepos)

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
        }
    ]
}