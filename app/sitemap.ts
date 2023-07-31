import {MetadataRoute} from 'next'
import {getAllArticles} from '@/lib/getAllArticles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const urls = [
        'https://ryanfreeman.dev/',
        'https://ryanfreeman.dev/about',
        'https://ryanfreeman.dev/dashboard',
        'https://ryanfreeman.dev/writing',
        'https://ryanfreeman.dev/projects',
        'https://ryanfreeman.dev/uses'
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