import {ElementType, ReactNode} from 'react'
import {createSlug} from '@/lib/createSlug'
import Link from 'next/link'

type HeadingProps = {
    as?: ElementType
    children: ReactNode
}

export function Heading({as: Component = 'h1', children = null}: HeadingProps) {
    let headingText = children ? children.toString() : ''

    return (
        <Component id={createSlug(headingText)} className='group'>
            {children}
            <Link className='ml-1 group-hover:opacity-100 opacity-0 transition-opacity ease-in'
                  href={`#${createSlug(headingText)}`}>#</Link>
        </Component>
    )
}