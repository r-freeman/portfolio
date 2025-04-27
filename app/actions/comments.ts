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
            }
        ]
    }
}

export async function addComment(prevState: { message: string }, formData: FormData) {
    const validation_error = 'Validation error, your comment was invalid.'
    const authorisation_error = 'Error, you must be logged in to post a comment.'
    const server_error = 'Server error, please try again later.'
    const success_message = 'Your comment was submitted and is awaiting approval.'

    const schema = z.object({
        comment: z.string().min(1).max(500),
        slug: z.string(),
        parent_id: z.string().optional()
    })

    let {comment, slug, parent_id} = {
        comment: formData.get('comment'),
        slug: formData.get('slug'),
        parent_id: formData.get('parent_id')
    }

    const parse = schema.safeParse({comment, slug, parent_id})
    if (!parse.success) {
        return {message: validation_error}
    }

    if (parent_id === '') parent_id = null

    try {
        const supabase = await createClient()
        const session = await auth()
        const isMe = process.env.GITHUB_USER_ID === String(session?.user?.id)

        if (!session?.user) {
            return {message: authorisation_error}
        }

        const {name, email, image, login} = session.user as { [k: string]: string }

        const [{data: user}, {data: article}] = await Promise.all([
            supabase.from('users').upsert({
                name,
                email,
                image,
                username: login ?? null
            }, {onConflict: 'email'}).select('*').single(),
            supabase.from('articles').select('*').eq('slug', slug).single()
        ])

        const {data: newComment, error} = await supabase
            .from('comments')
            .insert({content: comment, article_id: article?.id, user_id: user?.id, parent_id: parent_id, published: isMe})
            .select('*')
            .single()

        if (error || newComment?.id === null) {
            return {message: server_error}
        }

        if (process.env.NODE_ENV === 'production' && !isMe) {
            await sendNotification(notificationBody(newComment, user, article))
        }

        return {message: success_message}
    } catch (error) {
        console.error('Error posting comment:', error)
        return {message: server_error}
    }
}