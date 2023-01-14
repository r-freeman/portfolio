import Head from 'next/head'

import {Card} from '@/components/Card'
import {SimpleLayout} from '@/components/SimpleLayout'
import {Props} from 'types'

type Project = {
    name: string
    description: string
    link: {
        href: string
        label: string
    }
}

const projects: Project[] = [
    {
        name: 'Portfolio',
        description:
            'This is my personal website built using Tailwind and Next.js, it is a customised version of the Spotlight template from Tailwind UI.',
        link: {href: 'https://github.com/r-freeman/portfolio', label: 'r-freeman/portfolio'},
    },
    {
        name: 'Intellagent',
        description:
            'Intellagent is a cloud-based help desk software solution for small business, powered by AI and machine learning.',
        link: {href: 'https://github.com/r-freeman/intellagent-server', label: 'r-freeman/intellagent-server'},
    },
    {
        name: 'Super Mario Run',
        description:
            'Mobile game inspired by Super Mario Bros, built with JavaScript and Phaser.',
        link: {href: 'https://github.com/r-freeman/super-mario-run', label: 'r-freeman/super-mario-run'},
    },
    {
        name: 'ASOS Prototype',
        description:
            'Working prototype of ASOS\' website built in Axure RP 8.',
        link: {href: 'https://github.com/r-freeman/ASOS-Axure-Prototype', label: 'r-freeman/ASOS-Axure-Prototype'},
    },
    {
        name: 'College App',
        description:
            'Full-stack application built with Laravel 6, Vue.js and Tailwind CSS.',
        link: {href: 'https://github.com/r-freeman/college-app', label: 'r-freeman/college-app'},
    }
]

function LinkIcon(props: Props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                fill="currentColor"
            />
        </svg>
    )
}

export default function Projects() {
    return (
        <>
            <Head>
                <title>Projects - Ryan Freeman</title>
                <meta
                    name="description"
                    content="Things I've made and projects I've worked on."
                />
                <meta
                    property="og:title"
                    content="Projects - Ryan Freeman"
                />
                <meta
                    property="og:description"
                    content="Things I've made and projects I've worked on."
                />
            </Head>
            <SimpleLayout
                title="Things I've made and projects I've worked on."
                intro="Here's a selection of academic and personal projects that I have worked on. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
                gradient="bg-gradient-to-r from-sky-400 to-blue-500"
            >
                <ul
                    role="list"
                    className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project) => (
                        <Card as="li" key={project.name}>
                            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                                <Card.Link href={project.link.href}>{project.name}</Card.Link>
                            </h2>
                            <Card.Description>{project.description}</Card.Description>
                            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-indigo-500 dark:text-zinc-200">
                                <LinkIcon className="h-6 w-6 flex-none"/>
                                <span className="ml-2">{project.link.label}</span>
                            </p>
                        </Card>
                    ))}
                </ul>
            </SimpleLayout>
        </>
    )
}