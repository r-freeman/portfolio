import {ReactNode} from 'react'

export type Article = {
    slug: string
    title: string
    date: string
    description: string
}

export type Props = {
    className?: string
    children?: ReactNode
}