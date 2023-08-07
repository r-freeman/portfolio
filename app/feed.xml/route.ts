import {NextRequest} from 'next/server'
import {Feed} from 'feed'
import * as cheerio from 'cheerio'
import {getAllArticles} from '@/lib/getAllArticles'

export async function GET(req: NextRequest) {
    let siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ""
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
        let html = await (await fetch(url)).text()
        let $ = cheerio.load(html)

        let _article = $('article').first()
        let title = _article.find('h1').first().text()
        let date = _article.find('time').first().attr('datetime') ?? new Date()
        let content = _article.find('.prose').first().html() ?? ""

        feed.addItem({
            title,
            id: url,
            link: url,
            content,
            author: [author],
            contributor: [author],
            date: new Date(date)
        })
    }

    return new Response(feed.rss2(), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}