import React, {ElementType, ReactNode} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Container} from '@/components/common/Container'
import {MailIcon} from '@/components/icons/MailIcon'
import {GitHubIcon, LinkedInIcon} from '@/components/icons/SocialIcons'
import clsx from 'clsx'
import me from '@/public/images/me.jpg'
import awsCCPBadge from '@/public/images/aws-certified-cloud-practitioner-badge.png'
import {Views} from '@/components/ui/Views';

export const metadata = {
    title: 'About - Ryan Freeman',
    description: 'I’m Ryan. I live in Dublin, Ireland where I work as a software engineer.'
}

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
        <Container className="mt-16 sm:mt-32">
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
                        I’m Ryan. I live in Dublin, Ireland where I work as a software engineer.
                    </h1>
                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                        <p>
                            I&apos;ve always had an affinity for technology, and loved making things for as long as I can
                            remember. My first computer was an Amstrad CPC 464 way back in the 90s, which is ancient by modern
                            standards. My passion for tinkering continued through my teens and into adulthood where I
                            eventually found my way into software engineering.
                        </p>
                        <p>
                            In terms of my experience to date, I have a strong foundation in both front-end and back-end
                            development. I enjoy working with React to create dynamic and responsive user interfaces,
                            and I have a deep understanding of Java for building robust and scalable applications.
                            Recently, I achieved one of my milestones which was to get AWS certified by the end of 2022.
                        </p>
                        <p>
                            Currently, I work in the aviation industry for Aer Lingus as a software engineer where I work
                            on exciting software projects for the airline. This includes everything from bug fixing, to
                            working on legacy code and greenfield projects, to building customer-facing websites and services.
                            I am responsible for ensuring that our software is of the highest quality, and that it meets the
                            needs of our customers and stakeholders. The most fulfilling part of my job is knowing that the
                            software I contribute to will be used by many thousands of people.
                        </p>
                        <p>
                            In my free time, I enjoy staying up-to-date on the latest developments in the world of software
                            engineering, and I am always looking for new ways to push the boundaries of what is possible with
                            technology. I&apos;m a huge advocate of free and open-source software and maintain a small
                            Raspberry Pi server which I use to experiment with Docker containers for self-hosted
                            services like Bitwarden, Nextcloud and Octoprint.
                        </p>
                        <p>
                            On the hardware side, I build and maintain my own computers and I like to upgrade and modernise
                            retro video game systems. When I&apos;m not tinkering, I mostly spend time with my
                            family and enjoy travelling whenever I can get away.
                        </p>
                        <p>
                            That&apos;s me in a nutshell, thank you for visiting my website, I hope that you find the
                            information here to be insightful. If you have any questions or would like to work with me, please
                            don&apos;t hesitate to get in touch.
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
            <Views slug="/about" shouldUpdateViews={true} shouldRender={false}/>
        </Container>
    )
}