export function createSlug(title: string) {
    return title.toLowerCase().replace(/[.\s]+/g, '-')
}