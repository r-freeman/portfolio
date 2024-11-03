import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {Card} from '@/components/ui/Card'
import React, {ElementType} from 'react'
import {CloudIcon} from '@/components/icons/CloudIcon'
import {DatabaseIcon} from '@/components/icons/DatabaseIcon'
import {AppIcon} from '@/components/icons/AppIcon'
import {CodeIcon} from '@/components/icons/CodeIcon'
import {ShieldIcon} from '@/components/icons/ShieldIcon'
import {EmailIcon} from '@/components/icons/EmailIcon'
import {RocketIcon} from '@/components/icons/RocketIcon'
import {ShoppingBagIcon} from '@/components/icons/ShoppingBagIcon'
import {metadata as _metadata} from '@/lib/generateMetadata'

const meta = {
    title: 'Services',
    heading: 'I offer a wide range of digital services to elevate and transform your business',
    description: 'Whether you need a WordPress website, React app, AWS support or odd coding jobs, I\'m here to help. ' +
        'As an experienced software engineer, I produce high-quality software that will deliver immediate value for you and your customers.',
    type: 'website',
    alternates: {
        canonical: '/services'
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

type Services = {
    title: string
    description: string
    icon: ElementType
}

const iconStyles = `
    w-6
    h-6
    mr-2
    z-10
    transition
    stroke-zinc-500
    dark:stroke-zinc-400
    group-hover:dark:stroke-indigo-500
    group-hover:stroke-indigo-500
`

export default function Services() {
    const services: Services[] = [
        {
            title: 'AWS',
            description: 'As an AWS Certified Cloud Practitioner I can advise on and implement reliable, cost-effective cloud solutions for your business.',
            icon: (props) => <CloudIcon {...props}/>
        },
        {
            title: 'Databases',
            description: 'Not all database technologies are the same, I\'ll help you choose the right database for your use case.',
            icon: (props) => <DatabaseIcon {...props}/>
        },
        {
            title: 'Ecommerce',
            description: 'From WooCommerce to Shopify, I can assist with setting up and managing your online store, allowing you to focus on growing your sales.',
            icon: (props) => <ShoppingBagIcon {...props}/>
        },
        {
            title: 'WordPress',
            description: 'WordPress is the de-facto software for building SEO-friendly websites, together we can achieve top rankings in Google search results.',
            icon: (props) => <AppIcon {...props}/>
        },
        {
            title: 'Frontend',
            description: 'Using React, I can deliver modern, responsive websites and applications that seamlessly adapt to any screen size.',
            icon: (props) => <CodeIcon {...props}/>
        },
        {
            title: 'Backend',
            description: 'From building APIs to authentication and integrating third-party services, I develop robust backend systems for your business needs.',
            icon: (props) => <RocketIcon {...props}/>
        },
        {
            title: 'Domain and hosting',
            description: 'Whether you’re launching a new website or migrating an existing one, I\'ll ensure your website is fast, secure and always online.',
            icon: (props) => <ShieldIcon {...props}/>
        },
        {
            title: 'Email',
            description: 'I\'ll help you establish trust with your clients by using a custom domain for your email that reflects your brand.',
            icon: (props) => <EmailIcon {...props}/>
        }
    ]

    return (
        <SimpleLayout
            heading={meta.heading}
            description={meta.description}
            gradient="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
            <ul
                role="list"
                className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
            >
                {services.map(({title, description, icon: Icon}) => (
                    <Card as="li" key={title}>
                        <h2 className="flex items-center text-base font-semibold group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-100">
                            <Icon className={iconStyles}/>
                            <Card.Link href="mailto:hello@ryanfreeman.dev" ariaLabel={title}>{title}</Card.Link>
                        </h2>
                        <Card.Description>{description}</Card.Description>
                    </Card>
                ))}
            </ul>
        </SimpleLayout>
    )
}