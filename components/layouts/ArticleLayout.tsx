import React, {ReactNode} from 'react'
import Link from 'next/link'
import {Container} from '@/components/common/Container'
import {Prose} from '@/components/ui/Prose'
import {Views} from '@/components/ui/Views'
import {ArrowDownIcon} from '@/components/icons/ArrowDownIcon'
import {formatDate} from '@/lib/formatDate'
import ArticleNav from '@/components/ui/ArticleNav'
import Comments from '@/components/ui/Comments'
import {getAllArticles} from '@/lib/getAllArticles'

type ArticleLayout = {
    title: string
    date: string
    description: string
    slug: string
    children?: ReactNode
}

const gradients = [
    'bg-gradient-to-r from-blue-500 to-blue-600',
    'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700',
    'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800',
    'bg-gradient-to-r from-orange-400 to-rose-400',
    'bg-gradient-to-r from-sky-400 to-blue-500'
]

type Article = {
    slug: string
    authors: string
    title: string
    date: string
    description: string
}

function findAdjacentArticles(articles: Article[], slug: string) {
    let prev, next
    if (articles) {
        const index = articles.findIndex(article => article.slug === slug)
        prev = index > 0 ? articles[index - 1] : null
        next = index < articles.length - 1 ? articles[index + 1] : null
    }

    return {prev, next}
}

export async function ArticleLayout({
                                        title,
                                        date,
                                        slug,
                                        children
                                    }: ArticleLayout) {
    const articles = await getAllArticles(false)
    const {prev, next} = findAdjacentArticles(articles, slug)

    return (
        <Container className="mt-16 lg:mt-32">
            <div className="xl:relative">
                <div className="mx-auto max-w-2xl">
                    <Link href="/writing">
                        <button
                            type="button"
                            aria-label="Go back to articles"
                            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
                        >
                            <ArrowDownIcon
                                className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400 rotate-90"/>
                        </button>
                    </Link>
                    <article>
                        <header className="flex flex-col">
                            <h1 className={`mt-6 text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text pb-1 dark:text-transparent ${gradients[Math.floor(gradients.length * Math.random())]}`}>
                                {title}
                            </h1>
                            <p className="order-first text-base text-zinc-500 dark:text-zinc-400">
                                <time dateTime={date}>
                                    <span>{formatDate(date)}</span>
                                </time>
                                <Views slug={slug} title={title} shouldUpdateViews={true}/>
                            </p>
                        </header>
                        <Prose className="mt-8" data-mdx-content>{children}</Prose>
                    </article>
                    <Comments slug={slug}/>
                    <ArticleNav prev={prev} next={next}/>
                </div>
            </div>
        </Container>
    )
}
