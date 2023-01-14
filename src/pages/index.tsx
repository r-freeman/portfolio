import Head from 'next/head'
import Link from 'next/link'
import {GetStaticProps} from 'next'
import {ElementType} from 'react'

import {Card} from '@/components/Card'
import {Button} from '@/components/Button'
import {Container} from '@/components/Container'
import {
    GitHubIcon,
    LinkedInIcon,
    TwitterIcon
} from '@/components/SocialIcons'
import {formatDate} from '@/lib/formatDate'
import {generateRssFeed} from '@/lib/generateRssFeed'
import {generateSitemap} from '@/lib/generateSitemap'
import {getAllArticles} from '@/lib/getAllArticles'
import {Article} from 'types'

type Work = {
    company: string
    title: string
    start: {
        label: string
        dateTime: string
    }
    end: {
        label: string
        dateTime: string
    }
}

type SocialLink = {
    href: string
    icon: ElementType
}

function BriefcaseIcon(props: { className: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
            />
            <path
                d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
                className="stroke-zinc-400 dark:stroke-zinc-500"
            />
        </svg>
    )
}

function ArrowDownIcon(props: { className: string }) {
    return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
            <path
                d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function Article(article: Article) {
    return (
        <Card as="article">
            <Card.Title href={`/writing/${article.slug}`}>
                {article.title}
            </Card.Title>
            <Card.Eyebrow as="time" dateTime={article.date} decorate={false}>
                {formatDate(article.date)}
            </Card.Eyebrow>
            <Card.Description>{article.description}</Card.Description>
            <Card.Cta>Read more</Card.Cta>
        </Card>
    )
}

function SocialLink({icon: Icon, href}: SocialLink) {
    return (
        <Link className="group -m-1 p-1" href={href}>
            <Icon
                className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"/>
        </Link>
    )
}

function Resume() {
    const work: Work[] = [
        {
            company: 'Aer Lingus',
            title: 'Software engineer',
            start: {
                label: '2022',
                dateTime: '2022'
            },
            end: {
                label: 'present',
                dateTime: new Date().getFullYear().toString(),
            }
        },
        {
            company: 'Apple',
            title: 'At home advisor',
            start: {
                label: '2014',
                dateTime: '2014'
            },
            end: {
                label: '2018',
                dateTime: '2018'
            },
        }
    ]

    return (
        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 -mt-6">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <BriefcaseIcon className="h-6 w-6 flex-none"/>
                <span className="ml-3">Work</span>
            </h2>
            <ol className="mt-6 space-y-4">
                {work.map((role, roleIndex) => (
                    <li key={roleIndex} className="flex gap-4">

                        <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dt className="sr-only">Company</dt>
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {role.company}
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                                {role.title}
                            </dd>
                            <dt className="sr-only">Date</dt>
                            <dd
                                className="ml-auto text-xs text-zinc-500 dark:text-zinc-400"
                                aria-label={`${role.start.label ?? role.start} until ${
                                    role.end.label ?? role.end
                                }`}
                            >
                                <time dateTime={role.start.dateTime ?? role.start}>
                                    {role.start.label ?? role.start}
                                </time>
                                <span aria-hidden="true">–</span>
                                <time dateTime={role.end.dateTime ?? role.end}>
                                    {role.end.label ?? role.end}
                                </time>
                            </dd>
                        </dl>
                    </li>
                ))}
            </ol>
            <Button href="/Ryan Freeman CV.pdf" variant="secondary" className="group mt-6 w-full">
                Download CV
                <ArrowDownIcon
                    className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"/>
            </Button>
        </div>
    )
}

export default function Home({articles}: { articles: Article[] }) {
    return (
        <>
            <Head>
                <title>
                    Ryan Freeman - Full-stack software engineer from Dublin, Ireland.
                </title>
                <meta
                    name="description"
                    content="Full-stack software engineer who enjoys building cloud-native applications."
                />
                <meta
                    property="og:url"
                    content={`${process.env.NEXT_PUBLIC_SITE_URL}`}
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:title"
                    content="Ryan Freeman - Full-stack software engineer from Dublin, Ireland."
                />
                <meta
                    property="og:description"
                    content="Full-stack software engineer who enjoys building cloud-native applications."
                />
                <meta
                    property="og:image"
                    content="/static/images/photo-of-me-lg.jpg"
                />
                <meta
                    name="twitter:card"
                    content="summary_large_image"/>
                <meta
                    property="twitter:domain"
                    content="ryanfreeman.dev"/>
                <meta
                    property="twitter:url"
                    content={`${process.env.NEXT_PUBLIC_SITE_URL}`}
                />
                <meta
                    name="twitter:title"
                    content="Ryan Freeman - Full-stack software engineer from Dublin, Ireland."/>
                <meta
                    name="twitter:description"
                    content="Full-stack software engineer who enjoys building cloud-native applications."/>
                <meta
                    name="twitter:image"
                    content="/static/images/photo-of-me-lg.jpg"
                />
            </Head>
            <Container className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl bg-clip-text dark:text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                        Full-stack software engineer who enjoys building cloud-native applications.
                    </h1>
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        Hi. I&apos;m Ryan, a software engineer based in Dublin, Ireland. I&apos;m currently working in the
                        aviation industry for Aer Lingus. I am passionate about personal growth and progressing in my career.
                        This is my personal website where you can learn more about me, read
                        articles I&apos;ve written and see projects I&apos;ve worked on.
                    </p>
                    <div className="mt-6 flex gap-6">
                        <SocialLink
                            href="https://github.com/r-freeman"
                            aria-label="Follow on GitHub"
                            icon={GitHubIcon}
                        />
                        <SocialLink
                            href="https://linkedin.com/in/r-freeman/"
                            aria-label="Follow on LinkedIn"
                            icon={LinkedInIcon}
                        />
                        <SocialLink
                            href="https://twitter.com/freemry"
                            aria-label="Follow on Twitter"
                            icon={TwitterIcon}
                        />
                    </div>
                </div>
            </Container>
            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16">
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

export const getStaticProps: GetStaticProps = async () => {
    if (process.env.NODE_ENV === 'production') {
        await generateRssFeed()
        await generateSitemap()
    }

    return {
        props: {
            articles: (await getAllArticles())
                .slice(0, 1)
                .map(({component, ...meta}) => meta),
        }
    }
}
