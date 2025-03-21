'use server'

import {createClient} from '@/lib/supabase/server'

export async function incrementViews(slug: string) {
    if (slug !== null) {
        const supabase = await createClient()
        await supabase.rpc('increment_views', {param_slug: slug})
    }
}