import {ElementType, useEffect} from 'react'
import fetcher from '@/lib/fetcher'
import {numberFormat} from '@/lib/numberFormat'
import {supabase} from '@/lib/supabase'
import useSWR, {useSWRConfig} from 'swr'

type ViewsProps = {
    as?: ElementType
    slug: string
    className?: string
    shouldUpdateViews?: boolean
}

export function Views({as: Component = 'span', slug, className, shouldUpdateViews = false}: ViewsProps) {
    const {data} = useSWR(`/api/views/${slug}`, fetcher) as { data: { views: number } }
    const {mutate} = useSWRConfig()

    useEffect(() => {
        if (shouldUpdateViews) {
            // subscribe to analytics table and react to updates at row level
            const sub = supabase
                .channel('any')
                .on('postgres_changes', {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'analytics',
                    filter: `slug=eq.${slug}`
                }, () => {
                    mutate(`/api/views/${slug}`)
                })
                .subscribe();

            return () => {
                sub.unsubscribe()
            }
        }
    }, [])

    useEffect(() => {
        if (shouldUpdateViews) {
            const registerView = async () => {
                await fetcher(`/api/views/${slug}`,
                    {
                        method: 'POST'
                    }
                )
            }

            registerView()
        }
    }, [])

    return (
        <Component className={className}>
            {` · ${data?.views > 0 ? numberFormat(data.views) : '—'} views`}
        </Component>
    )
}