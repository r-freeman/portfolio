import {createClient} from '@/lib/supabase/server'

export async function GET(request: Request, {params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    if (typeof slug !== 'undefined') {
        try {
            const supabase = await createClient()
            const {data: record, error} = await supabase
                .from('analytics')
                .select('*, articles!inner(*)')
                .eq('articles.slug', slug)

            if (record !== null) {
                const [{views}] = record
                return new Response(JSON.stringify({views: views}), {status: 200})
            }
        } catch (e) {
            return new Response(JSON.stringify({status: 'Internal Server Error'}), {status: 500})
        }
    }
    return new Response(JSON.stringify({status: 'Not Found'}), {status: 404})
}