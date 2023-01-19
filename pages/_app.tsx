import {useEffect, useRef} from 'react'
import type {AppProps} from 'next/app'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'

import '../styles/tailwind.css'
import 'focus-visible'

function usePrevious(value: string): string | null {
    let ref = useRef<string | null>(null)

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

export default function App({Component, pageProps, router}: AppProps) {
    let previousPathname = usePrevious(router.pathname)

    return (
        <>
            <div className="fixed inset-0 flex justify-center sm:px-8">
                <div className="flex w-full max-w-7xl lg:px-8">
                    <div className="w-full bg-white dark:bg-black dark:ring-zinc-300/20"/>
                </div>
            </div>
            <div className="relative">
                <Header/>
                <main>
                    <Component previousPathname={previousPathname} {...pageProps} />
                </main>
                <Footer/>
            </div>
        </>
    )
}
