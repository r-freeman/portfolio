import useSWR from 'swr'
import {ElementType, useEffect} from 'react'
import fetcher from '@/lib/fetcher'
import {numberFormat} from '@/lib/numberFormat'

type ViewsResponse = {
    views: string
}

type ViewsProps = {
    as?: ElementType
    slug: string
    className?: string
    shouldUpdateViews?: boolean
}

const updateViews = (slug: string) => fetcher(`/api/views/${slug}`, {method: 'POST'})

export function Views({as: Component = 'span', slug, className, shouldUpdateViews = true}: ViewsProps) {
    const {data} = useSWR<ViewsResponse>(`/api/views/${slug}`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount: true
    })
    const views = Number(data?.views)

    useEffect(() => {
        if (shouldUpdateViews) {
            updateViews(slug).then(r => r);
        }
    }, [slug, shouldUpdateViews])

    return (
        <Component className={className}>
            {` · ${views > 0 ? numberFormat(views) : '—'} views`}
        </Component>
    )
}