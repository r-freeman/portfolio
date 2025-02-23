export function numberFormat(value: number) {
    return new Intl.NumberFormat('en', {
        notation: 'standard'
    }).format(value)
}