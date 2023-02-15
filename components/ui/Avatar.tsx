import {Props} from '@/types'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import avatar from '@/public/static/images/avatar.jpg'

export function AvatarContainer({className, ...props}: { style?: Object } & Props) {
    return (
        <div
            className={clsx(
                className,
                'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
            )}
            {...props}
        />
    )
}

export function Avatar({large = false, className, ...props}: { large?: boolean, style?: Object } & Props) {
    return (
        <Link
            href="/"
            aria-label="Home"
            className={clsx(className, 'pointer-events-auto')}
            {...props}
        >
            <Image
                src={avatar}
                alt=""
                sizes={large ? '4rem' : '2.25rem'}
                className={clsx(
                    'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
                    large ? 'h-16 w-16' : 'h-9 w-9'
                )}
                placeholder="blur"
            />
        </Link>
    )
}