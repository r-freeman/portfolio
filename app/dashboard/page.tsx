import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {Card} from '@/components/ui/Card'
import {CardGroup} from '@/components/ui/CardGroup'
import {getDashboardData} from '@/lib/dashboard'
import {numberFormat} from '@/lib/numberFormat'

export const metadata = {
    title: 'Dashboard - Ryan Freeman',
    description: 'This is my digital life in numbers, I use this dashboard to keep track of various metrics across platforms like Spotify, GitHub, Twitter and for monitoring the performance of my Raspberry Pi using Grafana and Prometheus.'
}

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
    const metrics = await getDashboardData()

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
        </SimpleLayout>
    )
}