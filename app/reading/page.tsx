import {SimpleLayout} from '@/components/layouts/SimpleLayout'
import {Card} from '@/components/ui/Card'
import React from 'react';

export const metadata = {
    title: 'Reading - Ryan Freeman',
    description: 'I have many leather-bound books, take a look at my book recommendations.'
}

type Book = {
    title: string
    author: string
    url: string
}

export default async function Reading() {
    const books: Book[] = [
        {
            title: 'The StatQuest Illustrated Guide To Machine Learning',
            author: 'Josh Starmer',
            url: 'https://www.goodreads.com/book/show/61071078-the-statquest-illustrated-guide-to-machine-learning?from_search=true&from_srp=true&qid=P0adGCf2x6&rank=1'
        },
        {
            title: 'JavaScript: The Good Parts',
            author: 'Douglas Crockford',
            url: 'https://www.goodreads.com/book/show/2998152-javascript?from_search=true&from_srp=true&qid=ZB1r3CXS1L&rank=1'
        },
        {
            title: 'Introduction to Machine Learning with Python',
            author: 'Andreas C. Müller, Sarah Guido',
            url: 'https://www.goodreads.com/book/show/24346909-introduction-to-machine-learning-with-python?ref=nav_sb_ss_1_44'
        },
        {
            title: 'Python Crash Course',
            author: 'Eric Matthes',
            url: 'https://www.goodreads.com/book/show/23241059-python-crash-course?from_search=true&from_srp=true&qid=P23IVsHmuf&rank=1'
        },
        {
            title: 'Automate the Boring Stuff with Python',
            author: 'Al Sweigart',
            url: 'https://www.goodreads.com/book/show/22514127-automate-the-boring-stuff-with-python?ref=nav_sb_ss_1_22'
        },
        {
            title: 'JavaScript and jQuery',
            author: 'Jon Duckett',
            url: 'https://www.goodreads.com/book/show/16219704-javascript-and-jquery?from_search=true&from_srp=true&qid=HnvCmGl3Er&rank=1'
        },
        {
            title: 'Data Visualisation',
            author: 'Andy Kirk',
            url: 'https://www.goodreads.com/book/show/29200705-data-visualisation?ref=nav_sb_ss_1_18'
        },
        {
            title: 'Docker in Practice',
            author: 'Ian Miell, Aidan Hobson Sayers',
            url: 'https://www.goodreads.com/book/show/25484084-docker-in-practice?from_search=true&from_srp=true&qid=qiIF1RmMxV&rank=1'
        },
        {
            title: 'Laravel: Up and Running',
            author: 'Matt Stauffer',
            url: 'https://www.goodreads.com/book/show/28646669-laravel?ref=nav_sb_ss_2_9'
        },
        {
            title: 'HTML and CSS',
            author: 'Jon Duckett',
            url: 'https://www.goodreads.com/book/show/10361330-html-and-css?from_search=true&from_srp=true&qid=OKIiricQbD&rank=1'
        },
    ]

    return (
        <SimpleLayout
            heading="What's on my bookshelf"
            description={metadata.description}
            gradient="bg-gradient-to-r from-sky-400 to-blue-500">
            <ul
                role="list"
                className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
            >
                {books.map((book) => (
                    <Card as="li" key={book.title}>
                        <h2 className="text-base font-semibold transition group-hover:text-indigo-500 text-zinc-800 dark:text-zinc-100">
                            <Card.Link href={book.url}>{book.title}</Card.Link>
                        </h2>
                        <Card.Description>{book.author}</Card.Description>
                    </Card>
                ))}
            </ul>
        </SimpleLayout>
    )
}
