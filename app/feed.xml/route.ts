import {NextRequest} from 'next/server'
import {Feed} from 'feed'
import {getAllArticles} from '@/lib/getAllArticles'

export async function GET(req: NextRequest) {
    let siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
    let articles = await getAllArticles()
    let author = {
        name: 'Ryan Freeman',
        email: 'hello@ryanfreeman.dev'
    }

    let feed = new Feed({
        title: author.name,
        description: 'Full-stack software engineer who enjoys building cloud-native applications.',
        author,
        id: siteUrl,
        link: siteUrl,
        image: `${siteUrl}/favicon.ico`,
        favicon: `${siteUrl}/favicon.ico`,
        copyright: `Copyright ${(new Date).getFullYear()} Ryan Freeman. All rights reserved.`,
        feedLinks: {
            rss2: `${siteUrl}/feed.xml`
        }
    })

    for (let article of articles) {
        let url = `${siteUrl}/writing/${article.slug}`
        let title = article.title
        let date = new Date(article.date)
        let description = article.description

        feed.addItem({
            title,
            id: url,
            link: url,
            description,
            author: [author],
            contributor: [author],
            date
        })
    }

    return new Response(feed.rss2(), {
        status: 200,
        headers: {
            'Content-Type': 'application/xml'
        }
    })
}