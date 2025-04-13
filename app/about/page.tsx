import React, {ElementType, ReactNode} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Container} from '@/components/common/Container'
import {MailIcon} from '@/components/icons/MailIcon'
import {GitHubIcon, LinkedInIcon} from '@/components/icons/SocialIcons'
import {metadata as _metadata} from '@/lib/generateMetadata'
import clsx from 'clsx'
import me from '@/public/images/me.jpg'
import awsCCPBadge from '@/public/images/aws-certified-cloud-practitioner-badge.png'

const meta = {
    title: 'About',
    heading: 'I\'m Ryan. I live in Dublin, Ireland where I work as a software engineer.',
    description: 'I\'ve always had an affinity for technology, and loved making things for as long as I can remember. ' +
        'My first computer was an Amstrad CPC 464 way back in the 90s, which is ancient by modern standards. ' +
        'My passion for tinkering continued through my teens and into adulthood where I eventually found my way into software engineering.',
    type: 'website',
    alternates: {
        canonical: '/about'
    }
}

export let metadata: {
    [p: string]: string | Object
    heading: string
    description: string
    title: string
    type: string
    openGraph: {
        images: string | Object
        description: string
        title: string
        type: string
    }
}

metadata = _metadata({...meta, heading: meta.heading})

function SocialLink({
                        className,
                        href,
                        children,
                        icon: Icon
                    }:
                        {
                            className: string,
                            href: string,
                            children: ReactNode,
                            icon: ElementType
                        }) {
    return (
        <li className={clsx(className, 'flex')}>
            <Link
                href={href}
                className="group flex text-sm font-medium text-zinc-800 transition hover:text-indigo-500 dark:text-zinc-200 dark:hover:text-indigo-500"
            >
                <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-indigo-500"/>
                <span className="ml-4">{children}</span>
            </Link>
        </li>
    )
}

export default async function About() {
    return (
        <Container className="mt-36">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="lg:pl-20">
                    <div className="max-w-xs lg:max-w-sm px-2.5">
                        <Image
                            src={me}
                            alt=""
                            sizes="(min-width: 1024px) 32rem, 20rem"
                            className="aspect-square shadow-inner rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800 rotate-3"
                            placeholder="blur"
                        />
                    </div>
                </div>
                <div className="lg:order-first lg:row-span-2">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl bg-clip-text dark:text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        {meta.heading}
                    </h1>
                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                        <p>
                            {meta.description}
                        </p>
                        <p>
                            I have solid experience in both frontend and backend software engineering. I use React to develop
                            dynamic, responsive user interfaces (such as this website), and Spring to build robust, scalable
                            backend systems. I work with AWS daily and I'm a Amazon Web Services Certified Cloud Practitioner.
                        </p>
                        <p>
                            I'm currently working as a software engineer at Aer Lingus, contributing to projects ranging from bug
                            fixes and legacy code maintenance to greenfield projects and customer-facing services. Knowing my
                            work impacts thousands of users is very rewarding.
                        </p>
                        <p>
                            Beyond my day job, I stay up-to-date on software trends and support open-source technology. I run a
                            Raspberry Pi and a couple of Linux servers where I host a handful of useful services. I also build and
                            maintain computers and upgrade retro gaming systems.
                        </p>
                        <p>
                            When I'm not tinkering I enjoy spending time with my family and a travelling abroad whenever I can.
                            Anyways, thanks for visiting my site, feel free to reach out if you'd like to connect.
                        </p>
                    </div>
                </div>
                <div className="lg:pl-20">
                    <ul role="list">
                        <SocialLink
                            href="https://github.com/r-freeman"
                            icon={GitHubIcon}
                            className="mt-4">
                            Follow on GitHub
                        </SocialLink>
                        <SocialLink
                            href="https://linkedin.com/in/r-freeman/"
                            icon={LinkedInIcon}
                            className="mt-4">
                            Follow on LinkedIn
                        </SocialLink>
                        <SocialLink
                            href="mailto:hello@ryanfreeman.dev"
                            icon={MailIcon}
                            className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
                            hello@ryanfreeman.dev
                        </SocialLink>
                    </ul>
                    <Link href="https://credly.com/badges/10bd0eae-b383-411c-beb9-dadda80124c8/public_url">
                        <Image
                            src={awsCCPBadge}
                            width="170"
                            height="170"
                            alt="AWS Certified Cloud Practitioner"
                            className="mt-8"
                        />
                    </Link>
                </div>
            </div>
        </Container>
    )
}