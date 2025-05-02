import {MetadataRoute} from 'next'
import {getAllArticles} from '@/lib/getAllArticles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const urls = [
        'https://ryanfreeman.dev/',
        'https://ryanfreeman.dev/about',
        'https://ryanfreeman.dev/services',
        'https://ryanfreeman.dev/reading',
        'https://ryanfreeman.dev/writing',
        'https://ryanfreeman.dev/projects'
    ]

    const pages = urls.map(url => ({
        url,
        lastModified: new Date()
    }))

    const posts = (await getAllArticles()).map(({slug, date}) => ({
        url: `https://ryanfreeman.dev/writing/${slug}/`,
        lastModified: new Date(date).toISOString()
    }))

    return [...pages, ...posts]
}