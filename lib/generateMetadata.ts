type Meta = {
    title: string
    heading: string
    description: string
    type: string
    [name: string]: string | Object
}

export const metadata = (meta: Meta) => {
    return {
        ...meta,
        openGraph: {
            title: meta.title,
            description: meta.description,
            images: [
                {
                    url: `/api/og-image?text=${meta.heading}`,
                    width: 1200,
                    height: 600,
                    alt: meta.heading,
                    type: 'image/png'
                }
            ],
            type: meta.type
        }
    }
}