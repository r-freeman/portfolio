import {ReactNode} from 'react'
import Link from 'next/link'

export function InlineLink({href, children}: { href: string, children: ReactNode }) {
    return (
        <Link href={href} className="text-indigo-500 dark:text-indigo-400 hover:underline">
            {children}
        </Link>
    )
}