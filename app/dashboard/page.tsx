import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {Card} from '@/components/ui/Card'
import {CardGroup} from '@/components/ui/CardGroup'
import {getDashboardData} from '@/lib/dashboard'
import {numberFormat} from '@/lib/numberFormat'

export const metadata = {
    title: 'Dashboard - Ryan Freeman',
    description: 'This is my digital life in numbers, I use this dashboard to keep track of various metrics across platforms like Spotify, GitHub, Twitter and for monitoring the performance of my Raspberry Pi using Grafana and Prometheus.'
}

const config = {
    refreshInterval: 30000
}

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
    const metrics = await getDashboardData()
    // const tempData = (useSWR('api/grafana/temp', fetcher, config)).data as { temp: string }
    // const sysLoadData = (useSWR('api/grafana/sysload', fetcher, config)).data as { sysLoad: string }
    // const ramData = (useSWR('api/grafana/ram', fetcher, config)).data as { ramUsage: string }
    // const rootFsData = (useSWR('api/grafana/rootfs', fetcher, config)).data as { rootFsUsage: string }
    // const uptimeData = (useSWR('api/grafana/uptime', fetcher, config)).data as { days: number }

    return (
        <SimpleLayout heading="Dashboard."
                      description={metadata.description}
                      gradient="bg-gradient-to-r from-orange-300 to-rose-300">
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
            {/*<CardGroup title="Raspberry Pi">*/}
            {/*    <Card as="li">*/}
            {/*        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">*/}
            {/*            <Card.Link href="#">Temperature</Card.Link>*/}
            {/*        </h2>*/}
            {/*        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">*/}
            {/*            {tempData ? `${tempData.temp}℃` : "—"}*/}
            {/*        </Card.Description>*/}
            {/*    </Card>*/}
            {/*    <Card as="li">*/}
            {/*        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">*/}
            {/*            <Card.Link href="#">Sys load (5m avg)</Card.Link>*/}
            {/*        </h2>*/}
            {/*        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">*/}
            {/*            {sysLoadData ? `${sysLoadData.sysLoad}%` : "—"}*/}
            {/*        </Card.Description>*/}
            {/*    </Card>*/}
            {/*    <Card as="li">*/}
            {/*        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">*/}
            {/*            <Card.Link href="#">RAM usage</Card.Link>*/}
            {/*        </h2>*/}
            {/*        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">*/}
            {/*            {ramData ? `${ramData.ramUsage}%` : "—"}*/}
            {/*        </Card.Description>*/}
            {/*    </Card>*/}
            {/*    <Card as="li">*/}
            {/*        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">*/}
            {/*            <Card.Link href="#">Root FS usage</Card.Link>*/}
            {/*        </h2>*/}
            {/*        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">*/}
            {/*            {rootFsData ? `${rootFsData.rootFsUsage}%` : "—"}*/}
            {/*        </Card.Description>*/}
            {/*    </Card>*/}
            {/*    <Card as="li">*/}
            {/*        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-400">*/}
            {/*            <Card.Link href="#">Uptime days</Card.Link>*/}
            {/*        </h2>*/}
            {/*        <Card.Description className="mt-0 text-zinc-800 dark:text-zinc-100 font-semibold text-3xl">*/}
            {/*            {uptimeData ? `${numberFormat(uptimeData.days)}` : "—"}*/}
            {/*        </Card.Description>*/}
            {/*    </Card>*/}
            {/*</CardGroup>*/}
        </SimpleLayout>
    )
}