import React from 'react'
import Head from 'next/head'
import {GetStaticProps} from 'next'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {Card} from '@/components/Card'
import {CardGroup} from '@/components/CardGroup'
import {numberFormat} from '@/lib/numberFormat'
import {getDashboardData} from '@/lib/dashboard'
import type {MetricGroup} from '@/types'


export default function Dashboard({metrics}: { metrics: MetricGroup }) {
    return (
        <>
            <Head>
                <title>Dashboard - Ryan Freeman</title>
                <meta
                    name="description"
                    content="This is my digital life in numbers which is updated daily. I use this dashboard to keep track of various metrics across platforms like Spotify, GitHub, Twitter and more."
                />
                <meta
                    property="og:title"
                    content="Dashboard - Ryan Freeman"
                />
                <meta
                    property="og:description"
                    content="This is my digital life in numbers which is updated daily. I use this dashboard to keep track of various metrics across platforms like Spotify, GitHub, Twitter and more."
                />
            </Head>
            <SimpleLayout
                title="Dashboard."
                intro="This is my digital life in numbers which is updated daily. I use this dashboard to keep track of various metrics across platforms like Spotify, GitHub, Twitter and more."
                gradient="bg-gradient-to-r from-orange-300 to-rose-300"
            >
                {metrics.map(({groupName, groupItems}) => (
                    <CardGroup title={groupName} key={groupName}>
                        {groupItems.map((item) => (
                            <Card as="li" key={item.title}>
                                <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                                    <Card.Link href={item.href}>{item.title}</Card.Link>
                                </h2>
                                <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">
                                    {typeof item.value === "number" ? numberFormat(item.value) : item.value}
                                </Card.Description>
                            </Card>
                        ))}
                    </CardGroup>
                ))}
            </SimpleLayout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            metrics: await getDashboardData()
        }
    }
}
