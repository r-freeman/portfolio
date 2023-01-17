import {ElementType, useEffect} from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

function numberFormat(value: number) {
    return new Intl.NumberFormat('en', {
        notation: 'compact'
    }).format(value)
}

type ViewsType = {
    views: string
}

export function Views({as: Component = 'span', slug}: { as?: ElementType, slug: string }) {
    const {data} = useSWR<ViewsType>(`/api/views/${slug}`, fetcher)
    const views = Number(data?.views)

    useEffect(() => {
        const registerView = () =>
            fetch(`/api/views/${slug}`, {
                method: 'POST'
            })

        registerView().then(r => r)
    }, [slug])

    return (
        <Component>
            {views > 0 ? `${numberFormat(views)} views` : ''}
        </Component>
    )
}