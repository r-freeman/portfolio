import React, {ReactNode} from 'react'
import {Container} from '@/components/common/Container'
import {twMerge} from 'tailwind-merge'
import {SocialLink} from '@/components/ui/SocialLink'
import {GitHubIcon, LinkedInIcon} from '@/components/icons/SocialIcons'

export type SimpleLayoutProps = {
    heading: string
    description: string
    children: ReactNode
    gradient: string
    displaySocials?: boolean
}

export function SimpleLayout({
                                 heading,
                                 description,
                                 children,
                                 gradient,
                                 displaySocials = false
                             }: SimpleLayoutProps) {
    return (
        <Container className="mt-16 sm:mt-32">
            <header className="max-w-2xl">
                <h1
                    className={twMerge(`
                        text-4xl
                        font-bold
                        tracking-tight
                        text-zinc-800
                        dark:text-zinc-100
                        sm:text-5xl
                        ${gradient ? `${gradient} bg-clip-text dark:text-transparent` : ''}
                    `)}>
                    {heading}
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    {description}
                </p>
                {displaySocials &&
                    <div className="mt-6 flex gap-6">
                        <SocialLink
                            href="https://github.com/r-freeman"
                            ariaLabel="Follow on GitHub"
                            icon={GitHubIcon}
                        />
                        <SocialLink
                            href="https://linkedin.com/in/r-freeman/"
                            ariaLabel="Follow on LinkedIn"
                            icon={LinkedInIcon}
                        />
                    </div>
                }
            </header>
            <div className="mt-16 sm:mt-20">{children}</div>
        </Container>
    )
}
