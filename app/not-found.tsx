import React from 'react'
import sitemap from '@/app/sitemap'
import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {Card} from '@/components/ui/Card'

const meta = {
    title: 'Ryan Freeman - Software engineer based in Dublin, Ireland.',
    heading: 'Sorry, the page you were looking for could not be found.',
    description: 'The page you requested may have been removed, renamed, or never existed. Verify the URL is correct or check the sitemap below to find what you were looking for.',
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

export default async function NotFound() {
    const pages = await sitemap()

    return (
        <SimpleLayout heading={meta.heading}
                      description={meta.description}
                      gradient="bg-gradient-to-r from-green-200 via-green-400 to-purple-700">
            <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none">
                <nav className="max-w-3xl space-y-16 mt-6">
                    {pages.map(({url: url}, i) => {
                        return (
                            <Card variant="inline" as="div" key={i}>
                                <Card.Title href={url}>
                                    {url}
                                </Card.Title>
                            </Card>
                        )
                    })}
                </nav>
            </div>
        </SimpleLayout>
    )
}