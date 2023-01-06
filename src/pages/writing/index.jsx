import Head from 'next/head'

import {Card} from '@/components/Card'
import {SimpleLayout} from '@/components/SimpleLayout'
import {getAllArticles} from '@/lib/getAllArticles'
import {formatDate} from '@/lib/formatDate'

function Article({article}) {
    return (
        <article>
            <Card small={true}>
                <Card.Title href={`/writing/${article.slug}`}>
                    {article.title}
                </Card.Title>
                <Card.Eyebrow
                    as="time"
                    dateTime={article.date}
                    decorate={false}
                    className="flex-shrink-0 md:order-last md:mb-0"
                >
                    {formatDate(article.date)}
                </Card.Eyebrow>
            </Card>
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
                <div>
                    <div className="max-w-3xl space-y-16">
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
