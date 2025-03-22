import fetcher from '@/lib/fetcher'

const NTFY_URL = process.env.NTFY_URL || ''

export async function sendNotification(notificationBody: any) {
    if (NTFY_URL !== '') {
        await fetcher(NTFY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notificationBody)
        })
    }
}