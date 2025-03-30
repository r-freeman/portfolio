import React from 'react'
import {Card} from '@/components/ui/Card'
import {Views} from '@/components/ui/Views'
import {Resume} from '@/components/ui/Resume'
import {getAllArticles} from '@/lib/getAllArticles'
import type {Article} from '@/types'
import {metadata as _metadata} from '@/lib/generateMetadata'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {format} from 'date-fns'

const meta = {
    title: 'Ryan Freeman - Software engineer based in Dublin, Ireland.',
    heading: 'Software engineer currently working in the aviation industry.',
    description: 'Hi. I\'m Ryan, a software engineer based in Dublin, Ireland. I\'m currently working in the aviation industry for Aer Lingus. ' +
        'I am passionate about personal growth and progressing in my career. ' +
        'This is my personal website where you can learn more about me, read articles I\'ve written and see projects I\'ve worked on.',
    type: 'website',
    alternates: {
        canonical: '/'
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

function Article(article: Article) {
    return (
        <article>
            <Card>
                <Card.Title href={`/writing/${article.slug}`}>
                    {article.title}
                </Card.Title>
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
        </article>
    )
}

export default async function Home() {
    const articles = (await getAllArticles())
        .slice(0, 3)
        .map(component => component)

    return (
        <SimpleLayout heading={meta.heading}
                      description={meta.description}
                      gradient="bg-gradient-to-r from-pink-500 to-violet-500"
                      displaySocials={true}>
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
        </SimpleLayout>
    )
}