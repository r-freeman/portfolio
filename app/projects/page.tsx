import {ShareIcon} from '@/components/icons/ShareIcon'
import {SparklesIcon} from '@/components/icons/SparklesIcon'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {Card} from '@/components/ui/Card'
import {getPinnedRepos} from '@/lib/github'
import {numberFormat} from '@/lib/numberFormat'

export const metadata = {
    title: 'Projects - Ryan Freeman',
    description: 'Here\'s a selection of academic and personal projects that I have worked on. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.'
}

export const revalidate = 0

export default async function Projects() {
    const pinnedRepos = (await getPinnedRepos()).sort((a, b) => b.stargazerCount - a.stargazerCount)

    return (
        <SimpleLayout
            heading="Things I've made and projects I've worked on."
            description={metadata.description}
            gradient="bg-gradient-to-r from-sky-400 to-blue-500">
            <ul
                role="list"
                className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
            >
                {pinnedRepos.map((repo) => (
                    <Card as="li" key={repo.name}>
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-100">
                            <Card.Link href={repo.url}>{repo.name}</Card.Link>
                        </h2>
                        <Card.Description>{repo.description}</Card.Description>
                        <div
                            className="z-10 flex space-x-16 sm:space-x-0 sm:justify-between mt-8 items-center w-full group text-sm text-zinc-500 dark:text-zinc-400">
                            <p
                                className="flex items-center">
                                <span>{repo.primaryLanguage.name}</span>
                                <span
                                    className="mr-2 w-4 h-4 rounded-full order-first"
                                    style={{backgroundColor: repo.primaryLanguage.color}}/>
                            </p>
                            <div className="flex space-x-6">
                                <p className="flex items-center">
                                    {numberFormat(repo.stargazerCount)}
                                    <SparklesIcon className="order-first mr-2 w-5 h-5 fill-zinc-400 dark:fill-zinc-500"/>
                                </p>
                                <p className="flex items-center">
                                    {numberFormat(repo.forkCount)}
                                    <ShareIcon
                                        className="order-first mr-2 w-5 h-5 fill-zinc-400 dark:fill-zinc-500 -rotate-90"/>
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </ul>
        </SimpleLayout>
    )
}
