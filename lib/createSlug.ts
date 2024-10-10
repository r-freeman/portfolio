export function createSlug(title: string) {
    return title.toLowerCase()
        .replace(/['?:.,]+/g, '')
        .replace(/\s+/g, '-')
}