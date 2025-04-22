const LISTMONK_URL = process.env.LISTMONK_URL ?? ''
const LISTMONK_LIST_ID = process.env.LISTMONK_LIST_ID ?? ''
const LISTMONK_USERNAME = process.env.LISTMONK_USERNAME ?? ''
const LISTMONK_TOKEN = process.env.LISTMONK_TOKEN ?? ''

export async function addSubscriber(email: FormDataEntryValue | null) {
    if (email !== null && LISTMONK_URL !== '') {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', 'Basic ' + Buffer.from(LISTMONK_USERNAME + ':' + LISTMONK_TOKEN).toString('base64'))

        const response = await fetch(LISTMONK_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                email: email,
                lists: [parseInt(LISTMONK_LIST_ID)],
                preconfirm_subscriptions: true
            })
        })

        if (response.status === 409) {
            throw new Error('Already subscribed')
        } else if (response.status !== 200) {
            throw new Error('Server error')
        }
    }
}