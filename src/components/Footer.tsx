import Link from 'next/link'
import {ReactNode} from 'react'

import {OuterContainer, InnerContainer} from './Container'
import {SpotifyPlayer} from './SpotifyPlayer'

function NavLink({href, children}: { href: string, children: ReactNode }) {
    return (
        <Link
            href={href}
            className="transition hover:text-indigo-500 dark:hover:text-indigo-400"
        >
            {children}
        </Link>
    )
}

export function Footer() {
    return (
        <footer className="mt-32">
            <OuterContainer>
                <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
                    <InnerContainer>
                        <SpotifyPlayer/>
                        <div className="flex flex-col items-center justify-between gap-6 mt-12">
                            <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                <NavLink href="/about">About</NavLink>
                                <NavLink href="/writing">Writing</NavLink>
                                <NavLink href="/projects">Projects</NavLink>
                                <NavLink href="/uses">Uses</NavLink>
                            </div>
                        </div>
                    </InnerContainer>
                </div>
            </OuterContainer>
        </footer>
    )
}
