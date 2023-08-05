import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'mdx'],
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        mdxRs: true
    },
    images: {
        domains: ['i.scdn.co']
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
