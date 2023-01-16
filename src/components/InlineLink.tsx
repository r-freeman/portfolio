import {ReactNode} from 'react'
import Link from 'next/link'

export function InlineLink({href, children}: { href: string, children: ReactNode }) {
    return (
        <Link href={href} className="transition hover:text-indigo-500 dark:hover:text-indigo-400">
            {children}
        </Link>
    )
}