'use server'

import {z} from 'zod'
import {addSubscriber} from '@/lib/listmonk'

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

    return {message: 'Subscribed'}
}