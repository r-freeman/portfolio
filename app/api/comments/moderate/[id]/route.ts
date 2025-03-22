import {createClient} from '@/lib/supabase/server'
import {headers} from 'next/headers'

export async function PATCH(request: Request, {params}: { params: Promise<{ id: number }> }) {
    const {id} = await params
    const headersList = await headers()
    const authorizationHeader = headersList.get('authorization')

    if (authorizationHeader === `Bearer ${process.env.NTFY_TOKEN}`) {
        if (typeof id !== 'undefined') {
            const supabase = await createClient()

            await supabase.from('comments')
                .update({published: true})
                .eq('id', id)

            return new Response(null, {status: 204})
        }
        return new Response(JSON.stringify({status: 'Not Found'}), {status: 404})
    }

    return new Response(JSON.stringify({status: 'Unauthorized'}), {status: 401})
}