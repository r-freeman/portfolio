import {createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {NextApiRequest, NextApiResponse} from 'next'
import {Database} from '@/types/database.types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabaseServerClient = createServerSupabaseClient<Database>({
        req,
        res,
    })

    if (req.method === 'POST') {
        if (req.query.slug !== undefined) {
            const slug: string = req.query.slug.toString()
            // @ts-ignore
            await supabaseServerClient.rpc('increment_views', {page_slug: slug})

            return res.status(200).json({})
        }

        return res.status(400).json({})
    } else if (req.method === 'GET') {
        if (req.query.slug !== undefined) {
            const slug: string = req.query.slug.toString()
            const response = await supabaseServerClient
                .from('analytics')
                .select('views')
                .eq('slug', slug)
                .returns<any>()

            const {views} = response.data[0]

            return res.status(200).json({views})
        }

        return res.status(400).json({})
    }

    return res.status(405).json({})
}