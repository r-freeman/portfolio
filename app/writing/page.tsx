import React from 'react'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {Card} from '@/components/ui/Card'
import {Views} from '@/components/ui/Views'
import {formatDate} from '@/lib/formatDate'
import {getAllArticles} from '@/lib/getAllArticles'
import {metadata as _metadata} from '@/lib/generateMetadata'
import type {Article} from '@/types'

const meta = {
    title: 'Writing',
    heading: 'Writing on software engineering, and everything in between.',
    description: 'All of my long-form thoughts on software engineering, and more, displayed in chronological order.',
    type: 'website',
    alternates: {
        canonical: '/writing'
    }
}

export let metadata: {
    [p: string]: string | Object
    heading: string
    description: string
    title: string
    type: string
    openGraph: {
        images: string | Object
        description: string
        title: string
        type: string
    }
}

metadata = _metadata({...meta, heading: meta.heading})

function Article({article}: { article: Article }) {
    return (
        <article>
            <Card variant="inline">
                <Card.Title href={`/writing/${article.slug}`}>
                    {article.title}
                </Card.Title>
                <p className="flex order-first space-x-1 z-10 mb-3 md:mb-0 md:ml-4 md:order-last flex-shrink-0">
                    <Card.Eyebrow as="time" dateTime={article.date} decorate={false}>
                        {formatDate(article.date)}
                    </Card.Eyebrow>
                    <Views
                        slug={article.slug}
                        title={article.title}
                        className="text-sm text-zinc-500 dark:text-zinc-400"
                        shouldUpdateViews={false}
                    />
                </p>
            </Card>
        </article>
    )
}

export default async function Writing() {
    const articles = (await getAllArticles()).map(({component, ...meta}) => meta)

    return (
        <SimpleLayout
            heading={meta.heading}
            description={meta.description}
            gradient="bg-gradient-to-r from-pink-500 to-violet-500"
        >
            <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none">
                <div className="max-w-3xl space-y-16 mt-6">
                    {articles.map((article) => (
                        <Article key={article.slug} article={article}/>
                    ))}
                </div>
            </div>
        </SimpleLayout>
    )
}