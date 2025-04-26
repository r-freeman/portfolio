import {createClient} from '@/lib/supabase/client'
import {QueryData} from '@supabase/supabase-js'
import type {Comment} from '@/types'

export async function getComments(slug: string) {
    try {
        const supabase = await createClient()
        const commentsQuery = supabase
            .from('comments')
            .select(`
                    id,
                    content,
                    published,
                    created_at,
                    parent_id,
                    user:users!inner(id, name, image),
                    article:articles!inner(id, title, slug)
                `)
            .eq('article.slug', slug)
            .eq('published', true)
            .order('created_at', {ascending: false})

        type Comments = QueryData<typeof commentsQuery>

        const {data: comments, error} = await commentsQuery

        const commentMap = comments?.reduce<{ [key: number]: Comment }>((acc, comment) => {
            // @ts-ignore
            acc[comment.id] = {...comment, replies: []}
            return acc
        }, {})

        return comments?.reduce<Comment[]>((nested, comment) => {
            if (typeof commentMap !== 'undefined') {
                if (comment.parent_id !== null) {
                    const parent: Comment = commentMap[comment.parent_id]
                    if (parent) {
                        parent.replies?.push(commentMap[comment.id])
                        parent.replies?.sort((a, b) => a.id - b.id)
                    }
                } else {
                    nested.push(commentMap[comment.id])
                }
            }
            return nested
        }, [])
    } catch (error) {
        console.error(error)
    }
}