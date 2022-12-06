import Head from 'next/head'

import {Card} from '@/components/Card'
import {SimpleLayout} from '@/components/SimpleLayout'
import {getAllArticles} from '@/lib/getAllArticles'
import {formatDate} from '@/lib/formatDate'

function Article({article}) {
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <Card className="md:col-span-3">
                <Card.Title href={`/writing/${article.slug}`}>
                    {article.title}
                </Card.Title>
                <Card.Eyebrow
                    as="time"
                    dateTime={article.date}
                    className="md:hidden"
                    decorate={false}
                >
                    {formatDate(article.date)}
                </Card.Eyebrow>
                <Card.Description>{article.description}</Card.Description>
                <Card.Cta>Read article</Card.Cta>
            </Card>
            <Card.Eyebrow
                as="time"
                dateTime={article.date}
                className="mt-1 hidden md:block"
            >
                {formatDate(article.date)}
            </Card.Eyebrow>
        </article>
    )
}

export default function ArticlesIndex({articles}) {
    return (
        <>
            <Head>
                <title>Writing - Ryan Freeman</title>
                <meta
                    name="description"
                    content="Writing on software engineering, and everything in between."
                />
                <meta
                    property="og:title"
                    content="Writing - Ryan Freeman"
                />
                <meta
                    property="og:description"
                    content="Writing on software engineering, and everything in between."
                />
            </Head>
            <SimpleLayout
                title="Writing on software engineering, and everything in between."
                intro="All of my long-form thoughts on software engineering, and more, displayed in chronological order."
                gradient="bg-gradient-to-r from-pink-500 to-violet-500"
            >
                <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                    <div className="flex max-w-3xl flex-col space-y-16">
                        {articles.map((article) => (
                            <Article key={article.slug} article={article}/>
                        ))}
                    </div>
                </div>
            </SimpleLayout>
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {
            articles: (await getAllArticles()).map(({component, ...meta}) => meta),
        },
    }
}
