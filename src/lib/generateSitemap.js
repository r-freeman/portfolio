import glob from 'fast-glob'
import path from 'path'
import {getAllArticles} from '@/lib/getAllArticles'
import {writeFile} from 'fs/promises'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL

async function createSitemap(pages) {
    const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${pages.map((url) =>
            `<url>
                <loc>${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
            </url>`).join('')}
            </urlset>`.replace(/(\s\s+|\t)/g, ' ').trim()

    await writeFile('./public/sitemap.xml', sitemap, 'utf8')
}

async function createRobots() {
    const robots =
        `# *
        User-agent: *
        Allow: /
        
        # Host
        Host: ${BASE_URL}
        
        # Sitemaps
        Sitemap: ${BASE_URL}/sitemap.xml`.replace(/(\s\s+|\t)/g, ' ').trim()

    await writeFile('./public/robots.txt', robots, 'utf8')
}

export async function generateSitemap() {
    const excluded = [
        '_app.tsx',
        '_document.tsx',
        'index.tsx'
    ]

    const pages = (await glob(['*.tsx', '*.jsx'], {
        cwd: path.join(process.cwd(), 'src/pages/'),
    })).filter((page) => {
        return !excluded
            .includes(page)
    }).map((page) => {
        return `${BASE_URL}/${page}`
            .replace(/\.(tsx|jsx)$/, '')
    })

    pages.unshift(`${BASE_URL}/`)
    pages.push(`${BASE_URL}/writing`)

    const articles = await getAllArticles()
    const slugs = articles.map(({slug}) => `${BASE_URL}/writing/${slug}`)
    const allPages = [...pages, ...slugs]

    await Promise.all([
        await createSitemap(allPages),
        await createRobots()
    ])
}