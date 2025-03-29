'use server'

import {auth, signIn} from '@/auth'
import {createClient} from '@/lib/supabase/server'
import {z} from 'zod'
import {sendNotification} from '@/lib/ntfy'

export async function loginWithGitHub() {
    await signIn('github')
}

const notificationBody = (comment: { id: number, content: string }, user: { name: string }, article: { title: string }) => {
    return {
        topic: 'portfolio',
        message: `New comment on ${article.title} from ${user.name}:\n${comment.content}`,
        actions: [
            {
                action: 'http',
                label: 'Approve comment',
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/comments/moderate/${comment.id}`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${process.env.NTFY_TOKEN}`
                }
            },
            {
                action: 'http',
                label: 'Delete comment',
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/comments/moderate/${comment.id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${process.env.NTFY_TOKEN}`
                }
            }
        ]
    }
}

export async function addComment(prevState: { message: string }, formData: FormData) {
    const general_error = 'There was an error with your comment, please try again later.'
    const authorisation_error = 'Error, you must be logged in to post a comment.'
    const success_message = 'Your comment was submitted and is awaiting approval.'

    const schema = z.object({
        comment: z.string().min(3).max(255),
        slug: z.string()
    })

    const {comment, slug} = {
        comment: formData.get('comment'),
        slug: formData.get('slug')
    }

    const parse = schema.safeParse({comment, slug})
    if (!parse.success) {
        return {message: general_error}
    }

    try {
        const supabase = await createClient()
        const session = await auth()

        if (!session?.user) {
            return {message: authorisation_error}
        }

        const {name, email, image} = session.user

        const [{data: user}, {data: article}] = await Promise.all([
            supabase.from('users').upsert({name, email, image}, {onConflict: 'email'}).select('*').single(),
            supabase.from('articles').select('*').eq('slug', slug).single()
        ])

        const {data: newComment, error} = await supabase
            .from('comments')
            .insert({content: comment, article_id: article?.id, user_id: user?.id})
            .select('*')
            .single()

        if (error || newComment?.id === null) {
            return {message: general_error}
        }

        await sendNotification(notificationBody(newComment, user, article))

        return {message: success_message}
    } catch (error) {
        console.error('Error posting comment:', error)
        return {message: general_error}
    }
}