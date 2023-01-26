import Link from 'next/link'
import {ElementType} from 'react'
import clsx from 'clsx'

type SocialLink = {
    href: string
    ariaLabel: string
    icon: ElementType
    className?: string
}

export function SocialLink({icon: Icon, href, ariaLabel, className}: SocialLink) {
    return (
        <Link className="group -m-1 p-1" href={href} aria-label={ariaLabel}>
            <Icon
                className={clsx(className, "w-6 h-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300")}/>
        </Link>
    )
}