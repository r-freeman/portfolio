import {useSupabaseClient} from '@supabase/auth-helpers-react'
import {ElementType, useEffect} from 'react'
import useSWR, {useSWRConfig} from 'swr'
import fetcher from '@/lib/fetcher'
import {numberFormat} from '@/lib/numberFormat'

type ViewsProps = {
    as?: ElementType
    slug: string
    className?: string
    shouldUpdateViews?: boolean
    shouldRender?: boolean
}

export function Views({as: Component = 'span', slug, className, shouldUpdateViews = true, shouldRender = true}: ViewsProps) {
    const supabaseClient = useSupabaseClient()
    const {data} = useSWR(`/api/views/${slug}`, fetcher) as { data: { views: number } }
    const {mutate} = useSWRConfig()

    useEffect(() => {
        if (shouldUpdateViews) {
            // subscribe to analytics table and react to updates at row level
            const sub = supabaseClient
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

            registerView().then(() => mutate(`/api/views/${slug}`))
        }
    }, [])

    if (!shouldRender) return null

    return (
        <Component className={className}>
            {` · ${data?.views > 0 ? numberFormat(data.views) : '—'} views`}
        </Component>
    )
}