'use server'

import {auth, signIn} from '@/auth'
import {createClient} from '@/lib/supabase/server'
import {z} from 'zod'

export async function loginWithGitHub() {
    await signIn('github')
}

export async function addComment(prevState: { message: string }, formData: FormData) {
    const schema = z.object({
        comment: z.string().min(3).max(255),
        slug: z.string()
    })

    const parse = schema.safeParse({
        comment: formData.get('comment'),
        slug: formData.get('slug')
    })

    let message = ''
    if (!parse.success) {
        message = 'There was an error with your comment, please try again later.'
        return {message: message}
    }

    const supabase = await createClient()
    const session = await auth()
    const slug = formData.get('slug')
    const content = formData.get('comment')

    if (session?.user) {
        const {name, email, image} = session.user

        const [{data: user}, {data: article}] = await Promise.all([
            supabase.from('users')
                .upsert({name, email, image}, {onConflict: 'email'})
                .select('id')
                .single(),
            supabase.from('articles')
                .select('id')
                .eq('slug', slug)
                .single()
        ])

        if (user?.id && article?.id) {
            const {data: comment} = await supabase
                .from('comments')
                .insert({content: content, article_id: article.id, user_id: user.id})
                .select('id')
                .single()

            if (comment?.id === null) {
                message = 'There was an error with your comment, please try again later.'
                return {
                    message: message
                }
            }
        }
    }

    message = 'Your comment was posted successfully.'
    return {
        message
    }
}