import React from 'react'
import {Card} from '@/components/ui/Card'
import clsx from 'clsx'

export default function ArticleNav({prev, next}: { prev: any, next: any }) {
    return (
        <section className="mt-24">
            <ul
                role="list"
                className={clsx('grid grid-cols-1 gap-x-12 gap-y-16',
                    (prev !== null && next !== null) ? 'sm:grid-cols-2' : '')}
            >
                {prev !== null &&
                    <Card as="li" key={prev.slug}>
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-100">
                            <Card.Link href={`/writing/${prev.slug}`}
                                       ariaLabel={`Previous article: ${prev.title}`}>{prev.title}</Card.Link>
                        </h2>
                    </Card>
                }
                {next !== null &&
                    <Card as="li" key={next.slug}>
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-100">
                            <Card.Link href={`/writing/${next.slug}`}
                                       ariaLabel={`Next article: ${next.title}`}>{next.title}</Card.Link>
                        </h2>
                    </Card>
                }
            </ul>
        </section>
    )
}