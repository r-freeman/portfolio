import {QueryData} from '@supabase/supabase-js'
import {createClient} from '@/lib/supabase/server'
import {Comment} from '@/types'

export async function GET(request: Request, {params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params

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
                    user:users!inner(id, name, image, username),
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

        // @ts-ignore
        const nestedComments = comments?.reduce<Comment[]>((nested, comment) => {
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
                return nested
            }
        }, [])

        return new Response(JSON.stringify(nestedComments), {status: 200})
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({status: 'Internal Server Error'}), {status: 500})
    }
}