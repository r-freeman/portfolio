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
            <Link className='ml-1.5 group-hover:visible invisible'
                  href={`#${createSlug(headingText)}`}>#</Link>
        </Component>
    )
}