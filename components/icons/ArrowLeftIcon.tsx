import {Props} from '@/types'

export function ArrowLeftIcon(props: Props) {
    return (
        <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
        </svg>
    )
}