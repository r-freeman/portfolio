'use server'

import {z} from 'zod'
import {addSubscriber} from '@/lib/listmonk'
import {sendNotification} from '@/lib/ntfy'

const notificationBody = (email: FormDataEntryValue | null) => {
    return {
        topic: 'portfolio',
        message: `${email} has subscribed to your newsletter.`,
        title: 'New subscriber',
        tags: ['rocket']
    }
}

export async function subscribe(prevState: { message: string }, formData: FormData) {
    const schema = z.object({
        email: z.string().email()
    })

    const {email} = {
        email: formData.get('email')
    }

    const parse = schema.safeParse({email})
    if (!parse.success) {
        return {message: 'Error, your email address is invalid.'}
    }

    try {
        await addSubscriber(email)
    } catch (error) {
        let errorMessage
        if (error instanceof Error) errorMessage = error.message
        else errorMessage = String(error)

        console.error(error)
        return {message: errorMessage}
    }

    await sendNotification(notificationBody(email))

    return {message: 'Subscribed'}
}