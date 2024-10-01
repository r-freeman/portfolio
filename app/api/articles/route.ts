import {getAllArticles} from '@/lib/getAllArticles'

export async function GET(request: Request) {
    const articles = await getAllArticles(false)

    return new Response(JSON.stringify(articles), {status: 200})
}
