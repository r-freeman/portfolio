import type {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import NProgress from 'nprogress'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider, Session} from '@supabase/auth-helpers-react'
import {useEffect, useState} from 'react'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'

import '../styles/nprogress.css'
import '../styles/tailwind.css'
import 'focus-visible'

export default function App({Component, pageProps}: AppProps<{ initialSession: Session }>) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    const router = useRouter()
    NProgress.configure({showSpinner: false})

    useEffect(() => {
        const handleRouteStart = () => NProgress.start()
        const handleRouteDone = () => NProgress.done()

        router.events.on("routeChangeStart", handleRouteStart)
        router.events.on("routeChangeComplete", handleRouteDone)
        router.events.on("routeChangeError", handleRouteDone)

        return () => {
            router.events.off("routeChangeStart", handleRouteStart)
            router.events.off("routeChangeComplete", handleRouteDone)
            router.events.off("routeChangeError", handleRouteDone)
        }
    })

    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
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
        </SessionContextProvider>
    )
}
