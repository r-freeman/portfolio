import Head from 'next/head'
import {GetStaticProps} from 'next'
import useSWR from 'swr'
import {SimpleLayout} from '@/components/SimpleLayout'
import {Card} from '@/components/Card'
import {numberFormat} from '@/lib/numberFormat'
import fetcher from '@/lib/fetcher'
import {getTotalFollowers, getTotalRepos, getTotalStars} from '@/lib/github'

type DashboardProps = {
    totalRepos: number
    totalFollowers: number
    totalStars: number
}

export default function Dashboard({totalRepos, totalFollowers, totalStars}: DashboardProps) {
    const {data} = useSWR('/api/views/', fetcher)
    const totalArticleViews = Number(data?.views)

    return (
        <>
            <Head>
                <title>Dashboard - Ryan Freeman</title>
                <meta
                    name="description"
                    content="This is my digital life in numbers which is updated daily. I use this dashboard to track various metrics across platforms like Spotify, GitHub, Twitter and more."
                />
                <meta
                    property="og:title"
                    content="Dashboard - Ryan Freeman"
                />
                <meta
                    property="og:description"
                    content="This is my digital life in numbers which is updated daily. I use this dashboard to track various metrics across platforms like Spotify, GitHub, Twitter and more."
                />
            </Head>
            <SimpleLayout
                title="Dashboard."
                intro="This is my digital life in numbers which is updated daily. I use this dashboard to track various metrics across platforms like Spotify, GitHub, Twitter and more."
                gradient="bg-gradient-to-r from-orange-300 to-rose-300"
            >
                <ul
                    role="list"
                    className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <Card as="li">
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                            <Card.Link href="https://github.com/r-freeman">GitHub Repos</Card.Link>
                        </h2>
                        <Card.Description className="text-zinc-800 dark:text-zinc-100 font-semibold text-5xl">
                            {numberFormat(totalRepos)}
                        </Card.Description>
                    </Card>
                    <Card as="li">
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                            <Card.Link href="https://github.com/r-freeman">GitHub Followers</Card.Link>
                        </h2>
                        <Card.Description className="text-zinc-800 dark:text-zinc-100 font-semibold text-5xl">
                            {numberFormat(totalFollowers)}
                        </Card.Description>
                    </Card>
                    <Card as="li">
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                            <Card.Link href="https://github.com/r-freeman">GitHub Stars</Card.Link>
                        </h2>
                        <Card.Description className="text-zinc-800 dark:text-zinc-100 font-semibold text-5xl">
                            {numberFormat(totalStars)}
                        </Card.Description>
                    </Card>
                    <Card as="li">
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                            <Card.Link href="https://github.com/r-freeman">Total Article Views</Card.Link>
                        </h2>
                        <Card.Description className="text-zinc-800 dark:text-zinc-100 font-semibold text-5xl">
                            {totalArticleViews > 0 ? numberFormat(totalArticleViews) : '—'}
                        </Card.Description>
                    </Card>
                </ul>
            </SimpleLayout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const [totalRepos, totalFollowers] = await Promise.all([
        getTotalRepos(),
        getTotalFollowers()
    ])

    const totalStars = await getTotalStars(totalRepos)

    return {
        props: {
            totalRepos,
            totalFollowers,
            totalStars
        }
    }
}
