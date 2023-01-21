import Head from 'next/head'

import {Card} from '@/components/Card'
import {SimpleLayout} from '@/components/SimpleLayout'
import {GitHubIcon} from '@/components/SocialIcons'
import {SocialLink} from '@/components/SocialLink'

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
            'This is my personal website built with TypeScript, Next.js, React and Tailwind CSS. It is a customised version of the Spotlight template from Tailwind UI.',
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
                                <SocialLink
                                    href={project.link.href}
                                    aria-label={`Checkout ${project.name} on GitHub`}
                                    icon={GitHubIcon}
                                />
                                <span className="ml-2">{project.link.label}</span>
                            </p>
                        </Card>
                    ))}
                </ul>
            </SimpleLayout>
        </>
    )
}