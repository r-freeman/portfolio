import {ElementType, ReactNode} from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import {twMerge} from 'tailwind-merge'
import {ChevronRightIcon} from '@/components/icons/ChevronRightIcon'

type Card = {
    as?: ElementType
    variant?: string
    className?: string
    children: ReactNode
}

type CardLink = {
    href: string
    children: ReactNode
}

type CardTitle = {
    as?: ElementType
    href: string
    children: ReactNode
}

type CardDescription = {
    children: ReactNode
    className?: string
}

type CardCta = {
    children: ReactNode
}

type CardEyebrow = {
    as: ElementType
    dateTime: string
    decorate: boolean
    className?: string
    children: ReactNode
}

export function Card({
                         as: Component = 'div',
                         variant = 'normal',
                         className,
                         children
                     }: Card) {

    type VariantStyles = {
        normal: string
        inline: string
    }

    const variantStyles: VariantStyles = {
        normal:
            'flex-col',
        inline:
            'flex-col md:flex-row md:justify-between',
    }

    return (
        <Component
            className={twMerge(`
                group
                relative
                flex
                items-baseline
                ${variantStyles[variant as keyof VariantStyles]}
                ${className ?? ""}
            `)}
        >
            {children}
        </Component>
    )
}

Card.Link = function CardLink({href, children}: CardLink) {
    return (
        <>
            <div
                className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"/>
            <Link href={href}>
                <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"/>
                <span className="relative z-10">{children}</span>
            </Link>
        </>
    )
}

Card.Title = function CardTitle({as: Component = 'h2', href, children}: CardTitle) {
    return (
        <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            {href ? <Card.Link href={href}>{children}</Card.Link> : children}
        </Component>
    )
}

Card.Description = function CardDescription({children, className}: CardDescription) {
    return (
        <p className={
            twMerge(`
                mt-2
                text-sm 
                text-zinc-600 
                dark:text-zinc-400
                relative 
                z-10
                ${className ?? ""}
            `)}>
            {children}
        </p>
    )
}

Card.Cta = function CardCta({children}: CardCta) {
    return (
        <div
            aria-hidden="true"
            className="relative z-10 mt-4 flex items-center text-sm font-medium text-zinc-400 group-hover:text-indigo-500 dark:text-zinc-200"
        >
            {children}
            <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current"/>
        </div>
    )
}

Card.Eyebrow = function CardEyebrow({
                                        as: Component = 'p',
                                        decorate = false,
                                        className,
                                        children,
                                        ...props
                                    }: CardEyebrow) {
    return (
        <Component
            className={clsx(
                className,
                'relative z-10 order-first flex items-center text-sm text-zinc-500 dark:text-zinc-400',
                decorate && 'pl-3.5'
            )}
            {...props}
        >
            {decorate && (
                <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"/>
        </span>
            )}
            {children}
        </Component>
    )
}
