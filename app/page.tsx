import React from 'react'
import {Card} from '@/components/ui/Card'
import {Views} from '@/components/ui/Views'
import {Resume} from '@/components/ui/Resume'
import {SocialLink} from '@/components/ui/SocialLink'
import {Container} from '@/components/common/Container'
import {GitHubIcon, LinkedInIcon} from '@/components/icons/SocialIcons'
import {getAllArticles} from '@/lib/getAllArticles'
import {formatDate} from '@/lib/formatDate'
import type {Article} from '@/types'

function Article(article: Article) {
    return (
        <article>
            <Card>
                <Card.Title href={`/writing/${article.slug}`}>
                    {article.title}
                </Card.Title>
                <p className="flex order-first space-x-1 z-10 mb-3">
                    <Card.Eyebrow as="time" dateTime={article.date} decorate={false}>
                        {formatDate(article.date)}
                    </Card.Eyebrow>
                    <Views
                        slug={article.slug}
                        className="text-sm text-zinc-500 dark:text-zinc-400"
                        shouldUpdateViews={false}
                    />
                </p>
            </Card>
        </article>
    )
}

export default async function Home() {
    const articles = (await getAllArticles())
        .slice(0, 3)
        .map(component => component)

    return (
        <>
            <Container className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl bg-clip-text dark:text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                        Full-stack software engineer who enjoys building cloud-native applications.
                    </h1>
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        Hi. I&apos;m Ryan, a software engineer based in Dublin, Ireland. I&apos;m currently working in the
                        aviation industry for Aer Lingus. I am passionate about personal growth and progressing in my career. This
                        is my personal website where you can learn more about me, read articles I&apos;ve written and see projects
                        I&apos;ve worked on.
                    </p>
                    <div className="mt-6 flex gap-6">
                        <SocialLink
                            href="https://github.com/r-freeman"
                            ariaLabel="Follow on GitHub"
                            icon={GitHubIcon}
                        />
                        <SocialLink
                            href="https://linkedin.com/in/r-freeman/"
                            ariaLabel="Follow on LinkedIn"
                            icon={LinkedInIcon}
                        />
                    </div>
                </div>
            </Container>
            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16 mt-6">
                        {articles.map(({slug, title, description, date}) => (
                            <Article
                                key={slug}
                                title={title}
                                description={description}
                                slug={slug}
                                date={date}
                            />
                        ))}
                    </div>
                    <div className="space-y-10 lg:pl-16 xl:pl-24">
                        <Resume/>
                    </div>
                </div>
            </Container>
        </>
    )
}