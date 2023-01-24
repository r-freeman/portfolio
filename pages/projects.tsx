import Head from 'next/head'
import {Card} from '@/components/Card'
import {SimpleLayout} from '@/components/SimpleLayout'
import {GitHubIcon} from '@/components/SocialIcons'
import {SocialLink} from '@/components/SocialLink'
import {GetStaticProps} from 'next'
import {getPinnedRepos} from '@/lib/github'
import type {Repo} from '@/types'

export default function Projects({pinnedRepos}: { pinnedRepos: Repo[] }) {
    return (
        <>
            <Head>
                <title>Projects - Ryan Freeman</title>
                <meta
                    name="description"
                    content="Things I've made and projects I've worked on."
                />
                <meta
                    property="og:title"
                    content="Projects - Ryan Freeman"
                />
                <meta
                    property="og:description"
                    content="Things I've made and projects I've worked on."
                />
            </Head>
            <SimpleLayout
                title="Things I've made and projects I've worked on."
                intro="Here's a selection of academic and personal projects that I have worked on. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
                gradient="bg-gradient-to-r from-sky-400 to-blue-500"
            >
                <ul
                    role="list"
                    className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {pinnedRepos.map((repo) => (
                        <Card as="li" key={repo.name}>
                            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                                <Card.Link href={repo.url}>{repo.name}</Card.Link>
                            </h2>
                            <Card.Description>{repo.description}</Card.Description>
                            <p
                                className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-indigo-500 dark:text-zinc-200">
                                <SocialLink
                                    href={repo.url}
                                    ariaLabel={`Checkout ${repo.name} on GitHub`}
                                    icon={GitHubIcon}
                                />
                                <span className="ml-2">{`r-freeman/${repo.name}`}</span>
                            </p>
                        </Card>
                    ))}
                </ul>
            </SimpleLayout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const pinnedRepos = await getPinnedRepos()

    return {
        props: {
            pinnedRepos
        }
    }
}
