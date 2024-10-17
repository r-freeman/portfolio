import {ReactNode} from 'react'
import {Providers} from '@/app/providers'
import {Header} from '@/components/common/Header'
import {Footer} from '@/components/common/Footer'

import '@/styles/tailwind.css'

export const metadata = {
    title: {
        default: 'Ryan Freeman - Full-stack software engineer based in Dublin, Ireland.',
        template: '%s - Ryan Freeman'
    },
    description: 'Full-stack software engineer who enjoys building cloud-native applications.',
    metadataBase: new URL('https://ryanfreeman.dev')
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html className="h-full antialiased" lang="en" suppressHydrationWarning={true}>
        <body className="flex h-full flex-col dark:bg-black-950">
        <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
                <div className="w-full bg-white dark:bg-black-950 dark:ring-zinc-300/20"/>
            </div>
        </div>
        <div className="relative">
            <Providers>
                <Header/>
                <main>
                    {children}
                </main>
                <Footer/>
            </Providers>
        </div>
        </body>
        </html>
    )
}