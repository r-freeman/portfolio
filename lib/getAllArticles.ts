import glob from 'fast-glob'
import * as path from 'path'
import {Article} from '@/types'

async function importArticle(articleFilename: string) {
    let {meta, default: component} = await import(
        `/app/writing/${articleFilename}`
        )
    return {
        slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
        ...meta,
        component
    }
}

export async function getAllArticles(dateDesc = true) {
    let articleFilenames = await glob(['*.mdx', '*/page.mdx'], {
        cwd: path.join(process.cwd(), './app/writing')
    })

    let articles = await Promise.all(articleFilenames.map(importArticle))

    return dateDesc ? articles.sort((a, z) => a.date < z.date ? 1 : -1)
        : articles.sort((a, z) => a.date > z.date ? 1 : -1)
}

export async function groupArticlesByYear() {
    return (await getAllArticles())
        .map(({component, ...meta}) => meta)
        .reduce<{ [year: string]: Article[] }>((acc, article) => {
            const year = new Date(article.date).getFullYear()
            if (!acc[year]) {
                acc[year] = []
            }
            acc[year].push(article)
            return acc
        }, {})
}
