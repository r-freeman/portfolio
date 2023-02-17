import type {AppProps} from 'next/app'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'

import '../styles/tailwind.css'
import 'focus-visible'

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <div className="fixed inset-0 flex justify-center sm:px-8">
                <div className="flex w-full max-w-7xl lg:px-8">
                    <div className="w-full bg-white dark:bg-black-950 dark:ring-zinc-300/20"/>
                </div>
            </div>
            <div className="relative">
                <Header/>
                <main>
                    <Component {...pageProps} />
                </main>
                <Footer/>
            </div>
        </>
    )
}
