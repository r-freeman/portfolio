import useSWR from 'swr'
import {ElementType, useEffect} from 'react'
import fetcher from '@/lib/fetcher'
import {numberFormat} from '@/lib/numberFormat'

type ViewsType = {
    views: string
}

const updateViews = (slug: string) => fetcher(`/api/views/${slug}`, {method: 'POST'})

export function Views({as: Component = 'span', slug}: { as?: ElementType, slug: string }) {
    const {data} = useSWR<ViewsType>(`/api/views/${slug}`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount: true
    })
    const views = Number(data?.views)

    useEffect(() => {
        updateViews(slug).then(r => r)
    }, [slug])

    return (
        <Component>
            {` · ${views > 0 ? numberFormat(views) : '—'} views`}
        </Component>
    )
}