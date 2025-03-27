import {createClient} from '@/lib/supabase/client'

export async function getComments(slug: string) {
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
                    article:articles!inner(id, title, slug)
                `)
            .eq('article.slug', slug)
            .eq('published', true)
            .order('created_at', {ascending: false})

        return comments
    } catch (error) {
        console.error(error)
    }
}