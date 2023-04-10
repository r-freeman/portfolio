import React, {ReactNode} from 'react'
import * as process from 'process'
import Head from 'next/head'
import Link from 'next/link'
import {Container} from '@/components/Container'
import {Prose} from '@/components/ui/Prose'
import {Views} from '@/components/ui/Views'
import {ArrowDownIcon} from '@/components/icons/ArrowDownIcon'
import {formatDate} from '@/lib/formatDate'

type ArticleLayout = {
    children?: ReactNode
    isRssFeed: boolean
    title: string
    description: string
    ogImage: string
    date: string
    slug: string
}

export function ArticleLayout({
                                  children,
                                  isRssFeed = false,
                                  title,
                                  description,
                                  ogImage,
                                  date,
                                  slug
                              }: ArticleLayout) {
    if (isRssFeed) {
        return children
    }

    return (
        <>
            <Head>
                <title>{`${title} - Ryan Freeman`}</title>
                <meta name="description" content={description}/>
                <meta
                    property="og:url"
                    content={`${process.env.NEXT_PUBLIC_SITE_URL}/writing/${slug}`}
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:title"
                    content={title}
                />
                <meta
                    property="og:description"
                    content={description}
                />
                {ogImage &&
                    <>
                        <meta
                            property="og:image"
                            content={ogImage}
                        />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                        <meta
                            name="twitter:image"
                            content={ogImage}
                        />
                    </>
                }
                <meta
                    property="twitter:domain"
                    content="ryanfreeman.dev"
                />
                <meta
                    property="twitter:url"
                    content={`${process.env.NEXT_PUBLIC_SITE_URL}/writing/${slug}`}
                />
                <meta
                    name="twitter:title"
                    content={title}
                />
                <meta
                    name="twitter:description"
                    content={description}
                />
            </Head>
            <Container className="mt-16 lg:mt-32">
                <div className="xl:relative">
                    <div className="mx-auto max-w-2xl">
                        <Link href="/writing" replace>
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
                                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                                    {title}
                                </h1>
                                <p className="order-first text-base text-zinc-500 dark:text-zinc-400">
                                    <time dateTime={date}>
                                        <span>{formatDate(date)}</span>
                                    </time>
                                    <Views slug={slug} shouldUpdateViews={true}/>
                                </p>
                            </header>
                            <Prose className="mt-8">{children}</Prose>
                        </article>
                    </div>
                </div>
            </Container>
        </>
    )
}
