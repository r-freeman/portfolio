'use client'

import {useEffect, useState} from 'react'
import {useTheme} from 'next-themes'
import {SunIcon} from '@/components/icons/SunIcon'
import {MoonIcon} from '@/components/icons/MoonIcon'

export function ThemeButton() {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        const timeout = setTimeout(() => setMounted(true), 500)
        return () => clearTimeout(timeout)
    }, [])

    function disableTransitionsTemporarily() {
        document.documentElement.classList.add('[&_*]:!transition-none')
        window.setTimeout(() => {
            document.documentElement.classList.remove('[&_*]:!transition-none')
        }, 0)
    }

    function toggleTheme() {
        disableTransitionsTemporarily()

        let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        let isSystemDarkMode = darkModeMediaQuery.matches
        let isDarkMode = theme === 'dark'

        if (isDarkMode === isSystemDarkMode) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    if (!mounted) return <ThemeButton.Skeleton/>

    return (
        <button
            type="button"
            aria-label="Toggle dark mode"
            className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
            onClick={() => toggleTheme()}
        >
            <SunIcon
                className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-indigo-50 [@media(prefers-color-scheme:dark)]:stroke-indigo-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-indigo-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-indigo-600"/>
            <MoonIcon
                className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-indigo-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-indigo-500"/>
        </button>
    )
}

ThemeButton.Skeleton = function ThemeButtonSkeleton() {
    return (
        <div
            className="animate-pulse rounded-full bg-zinc-100 px-3 py-2 backdrop-blur transition dark:bg-zinc-800/90">
            <div className="h-6 w-6"/>
        </div>
    )
}