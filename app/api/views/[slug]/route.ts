import {NextResponse} from 'next/server'
import {createClient} from '@/lib/supabase/server'

export async function GET(request: Request, {params}: { params: { slug: string } }) {
    const {slug} = await params
    if (typeof slug !== 'undefined') {
        try {
            const supabase = await createClient()
            const response = await supabase
                // @ts-ignore
                .from('analytics')
                .select('views')
                .eq('slug', slug)
                .returns<any>()

            const {views} = response.data[0]
            if (typeof views !== 'undefined') {
                return NextResponse.json({views})
            }
        } catch (e) {
            return new Response(JSON.stringify({status: 'Internal Server Error'}), {status: 500})
        }
    }
    return new Response(JSON.stringify({status: 'Not Found'}), {status: 404})
}

export async function POST(request: Request, {params}: { params: { slug: string } }) {
    const {slug} = await params
    if (typeof slug !== 'undefined') {
        try {
            const supabase = await createClient()
            // @ts-ignore
            await supabase.rpc('increment_views', {page_slug: slug})
            return NextResponse.json({})
        } catch (e) {
            return new Response(JSON.stringify({status: 'Internal Server Error'}), {status: 500})
        }
    }
    return new Response(JSON.stringify({status: 'Not Found'}), {status: 404})
}