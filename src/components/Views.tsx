import {ElementType, useEffect} from 'react'
import useSWRImmutable from 'swr/immutable'
import fetcher from '@/lib/fetcher'


function numberFormat(value: number) {
    return new Intl.NumberFormat('en', {
        notation: 'compact'
    }).format(value)
}

const updateViews = (slug: string) => fetcher(`/api/views/${slug}`, {method: 'POST'})

export function Views({as: Component = 'span', slug}: { as?: ElementType, slug: string }) {
    const {data} = useSWRImmutable(`/api/views/${slug}`, fetcher)
    const views = Number(data?.views)

    useEffect(() => {
        updateViews(slug).then(r => r)
    }, [slug])

    return (
        <Component>
            {` · ${views > 0 ? numberFormat(views) : '---'} views`}
        </Component>
    )
}