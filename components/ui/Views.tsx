import {ElementType, useEffect, useState} from 'react'
import fetcher from '@/lib/fetcher'
import {numberFormat} from '@/lib/numberFormat'
import {supabase} from '@/lib/supabase'

type ViewsProps = {
    as?: ElementType
    slug: string
    className?: string
    shouldUpdateViews?: boolean
}

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export function Views({as: Component = 'span', slug, className, shouldUpdateViews = false}: ViewsProps) {
    const [views, setViews] = useState(0)

    useEffect(() => {
        // subscribe to view updates at the row level
        const sub = supabase
            .channel('any')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'analytics',
                filter: `slug=eq.${slug}`
            }, payload => {
                setViews(payload.new.views)
            })
            .subscribe()

        return () => {
            sub.unsubscribe()
        }
    }, [])

    useEffect(() => {
        const getViews = async () => {
            const {views} = await fetcher(`${NEXT_PUBLIC_SITE_URL}/api/views/${slug}`)

            setViews(views)
        };

        getViews()
    }, [])

    useEffect(() => {
        if (shouldUpdateViews) {
            const registerView = async () => {
                const {views} = await fetcher(`${NEXT_PUBLIC_SITE_URL}/api/views/${slug}`,
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
            {` · ${views > 0 ? numberFormat(views) : '—'} views`}
        </Component>
    )
}