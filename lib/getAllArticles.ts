import glob from 'fast-glob'
import * as path from 'path'

async function importArticle(articleFilename: string) {
    let {meta, default: component} = await import(
        `/pages/writing/${articleFilename}`
        )
    return {
        slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
        ...meta,
        component,
    }
}

export async function getAllArticles() {
    let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
        cwd: path.join(process.cwd(), './pages/writing'),
    })

    let articles = await Promise.all(articleFilenames.map(importArticle))

    return articles.sort((a, z) => a.date < z.date ? 1 : -1)
}
