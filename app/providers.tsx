'use client'

import {ReactNode} from 'react'
import {ThemeProvider} from 'next-themes'

export function Providers({children}: {
    children: ReactNode
}) {

    return (
        <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="dark">
            {children}
        </ThemeProvider>
    )
}