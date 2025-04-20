import {Props} from '@/types'

export function CrossIcon(props: Props) {
    return (
        <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             aria-hidden="true" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
        </svg>
    )
}