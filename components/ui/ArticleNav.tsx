'use client'

import React, {ReactElement, useEffect, useState} from 'react'
import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import {Card} from '@/components/ui/Card'
import clsx from 'clsx'


type Article = {
    slug: string
    authors: string
    title: string
    date: string
    description: string
}

type FetchArticlesResponse = {
    data: Article[]
    error: string
    isLoading: boolean
}

type ArticleNavProps = {
    slug: string
}

type PaginationProps = {
    next: Article | null
    prev: Article | null
}

function useFetchArticles() {
    const {data, error, isLoading} = useSWR(`/api/articles/`, fetcher) as FetchArticlesResponse

    return {
        articles: data,
        isLoading,
        isError: error
    }
}

export default function ArticleNav({slug}: ArticleNavProps): ReactElement | null {
    const {articles, isLoading, isError} = useFetchArticles()
    const [{next, prev}, setPagination] = useState<PaginationProps>({next: null, prev: null})

    useEffect(() => {
        const findAdjacentArticles = (articles: Article[], slug: string) => {
            if (articles) {
                const index = articles.findIndex(article => article.slug === slug)
                const next = index < articles.length - 1 ? articles[index + 1] : null
                const prev = index > 0 ? articles[index - 1] : null

                setPagination({next, prev})
            }
        }

        findAdjacentArticles(articles, slug)
    }, [articles, slug])

    if (isError) return null

    return (
        <section className="mt-24">
            <ul
                role="list"
                className={clsx('grid grid-cols-1 gap-x-12 gap-y-16',
                    (prev !== null && next !== null) ? 'sm:grid-cols-2' : '')}
            >
                {prev !== null &&
                    <Card as="li" key={prev.slug}>
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-100">
                            <Card.Link href={`/writing/${prev.slug}`}
                                       ariaLabel={`Previous article: ${prev.title}`}>{prev.title}</Card.Link>
                        </h2>
                    </Card>
                }
                {next !== null &&
                    <Card as="li" key={next.slug}>
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-100">
                            <Card.Link href={`/writing/${next.slug}`}
                                       ariaLabel={`Next article: ${next.title}`}>{next.title}</Card.Link>
                        </h2>
                    </Card>
                }
            </ul>
        </section>
    )
}