import {createClient} from '@/lib/supabase/server'
import {NextResponse} from 'next/server'

export async function GET(request: Request, {params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    if (typeof slug !== 'undefined') {
        try {
            const supabase = await createClient()
            const {data: comments, error} = await supabase
                .from('comments')
                .select(`
                    id,
                    content,
                    published,
                    created_at,
                    user:users!inner(id, name, image),
                    article:articles!inner(id, slug)
                `)
                .eq('article.slug', slug)
                .eq('published', true)
                .order('created_at', {ascending: false})

            if (comments !== null && comments?.length > 0) {
                return NextResponse.json({comments: comments})
            }
            return NextResponse.json([])
        } catch (e) {
            return new Response(JSON.stringify({status: 'Internal Server Error'}), {status: 500})
        }
    }
    return new Response(JSON.stringify({status: 'Not Found'}), {status: 404})
}
