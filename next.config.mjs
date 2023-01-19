import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'mdx'],
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        newNextLinkBehavior: true,
        scrollRestoration: true
    },
    images: {
        domains: ['i.scdn.co']
    },
    async rewrites() {
        if (process.env.NODE_ENV === 'production') {
            return [
                {
                    source: '/api/:path',
                    destination: 'https://ryanfreeman.dev/:path/',
                }
            ]
        } else {
            return []
        }
    },
    async headers() {
        return [
            {
                source: '/api/spotify/currently-playing',
                headers: [
                    {
                        key: "Cache-Control",
                        value: "s-maxage=1, stale-while-revalidate=59"
                    }
                ]
            },
            {
                source: '/api/views/:slug',
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=0, must-revalidate"
                    }
                ]
            }
        ]
    }
}

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
    }
})

export default withMDX(nextConfig)
