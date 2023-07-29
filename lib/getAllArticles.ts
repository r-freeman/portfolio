import glob from 'fast-glob'
import * as path from 'path'

async function importArticle(articleFilename: string) {
    let {metadata, default: component} = await import(
        `/app/writing/${articleFilename}`
        )
    return {
        slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
        ...metadata,
        component,
    }
}

export async function getAllArticles() {
    let articleFilenames = await glob(['*.mdx', '*/page.mdx'], {
        cwd: path.join(process.cwd(), './app/writing'),
    })

    let articles = await Promise.all(articleFilenames.map(importArticle))

    return articles.sort((a, z) => a.date < z.date ? 1 : -1)
}
