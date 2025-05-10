import React, {ReactNode} from 'react'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {groupArticlesByYear} from '@/lib/getAllArticles'
import {metadata as _metadata} from '@/lib/generateMetadata'
import {Section} from '@/components/ui/Section'
import {Article} from '@/types'
import {Card} from '@/components/ui/Card'
import {Views} from '@/components/ui/Views'
import {format} from 'date-fns'

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

function ArticleSection({year, children}: { year: string, children: ReactNode }) {
    return (
        <Section title={year}>
            {children}
        </Section>
    )
}

function ArticleList({articles}: { articles: Article[] }) {
    return (
        <ul role="list" className="space-y-16">
            {articles.map((article) => (
                <Card key={article.slug} as="li">
                    <Card.Title href={`/writing/${article.slug}`}>{article.title}</Card.Title>
                    <p className="flex order-first space-x-1 z-10 mb-3">
                        <Card.Eyebrow as="time" dateTime={article.date} decorate={false}>
                            {format(article.date, 'd MMMM yyyy')}
                        </Card.Eyebrow>
                        <Views
                            slug={article.slug}
                            title={article.title}
                            className="text-sm text-zinc-500 dark:text-zinc-400"
                            shouldUpdateViews={false}
                        />
                    </p>
                </Card>
            ))}
        </ul>
    )
}

export default async function Writing() {
    const groupedArticles = await groupArticlesByYear()

    return (
        <SimpleLayout
            heading={meta.heading}
            description={meta.description}
            gradient="bg-gradient-to-r from-pink-500 to-violet-500"
        >
            <div className="space-y-20">
                {Object.entries(groupedArticles)
                    .sort(([a], [b]) => parseInt(b) - parseInt(a))
                    .map(([year, articles]) => (
                            <ArticleSection year={year} key={year}>
                                <ArticleList articles={articles}/>
                            </ArticleSection>
                        )
                    )
                }
            </div>
        </SimpleLayout>
    )
}