'use client'

import {ElementType, ReactNode, useEffect, useRef} from 'react'
import {createSlug} from '@/lib/createSlug'
import Link from 'next/link'

type HeadingProps = {
    as?: ElementType
    children: ReactNode
}

export function Heading({as: Component = 'h1', children = null}: HeadingProps) {
    const ref = useRef<HTMLAnchorElement>(null)
    const headingText = children?.toString() || ''

    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = '#'
        }
    }, [])

    return (
        <Component id={createSlug(headingText)} className="group">
            {children}
            <Link className="ml-1.5 invisible group-hover:visible" href={`#${createSlug(headingText)}`} ref={ref}></Link>
        </Component>
    )
}