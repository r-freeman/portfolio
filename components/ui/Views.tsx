'use client'

import {ElementType, useEffect} from 'react'
import useSWR, {useSWRConfig} from 'swr'
import {numberFormat} from '@/lib/numberFormat'
import fetcher from '@/lib/fetcher'
import {incrementViews} from '@/app/actions/views'

type ViewsProps = {
    as?: ElementType
    slug: string
    title: string
    className?: string
    shouldUpdateViews?: boolean
}

export function Views({as: Component = 'span', slug, title, className, shouldUpdateViews = true}: ViewsProps) {
    const {data} = useSWR(`/api/views/${slug}`, fetcher) as { data: { views: number } }
    const {mutate} = useSWRConfig()

    useEffect(() => {
        if (shouldUpdateViews) {
            const updateViews = async () => {
                const hasViewed = sessionStorage.getItem(`has-viewed-${slug}`)
                if (!hasViewed) {
                    await incrementViews(slug, title)

                    sessionStorage.setItem(`has-viewed-${slug}`, 'true')
                }
            }

            updateViews().then(() => mutate(`/api/views/${slug}`))
        }
    }, [])

    return (
        <Component className={className}>
            {` · ${data?.views > 0 ? numberFormat(data?.views) : '—'} views`}
        </Component>
    )
}