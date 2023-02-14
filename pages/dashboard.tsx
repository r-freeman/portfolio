import React from 'react'
import Head from 'next/head'
import {GetStaticProps} from 'next'
import useSWR from 'swr'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {Card} from '@/components/ui/Card'
import {CardGroup} from '@/components/ui/CardGroup'
import {numberFormat} from '@/lib/numberFormat'
import {getDashboardData} from '@/lib/dashboard'
import fetcher from '@/lib/fetcher'
import type {MetricGroup} from '@/types'

const config = {
    refreshInterval: 30000
}

export default function Dashboard({metrics}: { metrics: MetricGroup }) {
    const {data: tempData} = useSWR('api/grafana/temp', fetcher, config)
    const {data: sysLoadData} = useSWR('api/grafana/sysload', fetcher, config)
    const {data: ramData} = useSWR('api/grafana/ram', fetcher, config)
    const {data: rootFsData} = useSWR('api/grafana/rootfs', fetcher, config)
    const {data: uptimeData} = useSWR('api/grafana/uptime', fetcher, config)

    return (
        <>
            <Head>
                <title>Dashboard - Ryan Freeman</title>
                <meta
                    name="description"
                    content="This is my digital life in numbers which is updated daily. I use this dashboard to keep track of various metrics across platforms like Spotify, GitHub, Twitter and for monitoring the performance of my Raspberry Pi using Grafana."
                />
                <meta
                    property="og:title"
                    content="Dashboard - Ryan Freeman"
                />
                <meta
                    property="og:description"
                    content="This is my digital life in numbers which is updated daily. I use this dashboard to keep track of various metrics across platforms like Spotify, GitHub, Twitter and for monitoring the performance of my Raspberry Pi using Grafana."
                />
            </Head>
            <SimpleLayout
                title="Dashboard."
                intro="This is my digital life in numbers which is updated daily. I use this dashboard to keep track of various metrics across platforms like Spotify, GitHub, Twitter and for monitoring the performance of my Raspberry Pi using Grafana."
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
                <CardGroup title="Raspberry Pi">
                    <Card as="li">
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                            <Card.Link href="#">Temperature</Card.Link>
                        </h2>
                        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">
                            {tempData ? `${tempData.temp}℃` : "—"}
                        </Card.Description>
                    </Card>
                    <Card as="li">
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                            <Card.Link href="#">Sys load (5m avg)</Card.Link>
                        </h2>
                        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">
                            {sysLoadData ? `${sysLoadData.sysLoad}%` : "—"}
                        </Card.Description>
                    </Card>
                    <Card as="li">
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                            <Card.Link href="#">RAM usage</Card.Link>
                        </h2>
                        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">
                            {ramData ? `${ramData.ramUsage}%` : "—"}
                        </Card.Description>
                    </Card>
                    <Card as="li">
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                            <Card.Link href="#">Root FS usage</Card.Link>
                        </h2>
                        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">
                            {rootFsData ? `${rootFsData.rootFsUsage}%` : "—"}
                        </Card.Description>
                    </Card>
                    <Card as="li">
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">
                            <Card.Link href="#">Uptime days</Card.Link>
                        </h2>
                        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">
                            {uptimeData ? `${numberFormat(uptimeData.days)}` : "—"}
                        </Card.Description>
                    </Card>
                </CardGroup>
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
