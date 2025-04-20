import clsx from 'clsx'
import React, {ReactNode} from 'react'
import {CheckIcon} from '@/components/icons/CheckIcon'
import {CrossIcon} from '@/components/icons/CrossIcon'

type StatusMessageProps = {
    children: ReactNode
    className?: string
}

export function StatusMessage({children, className}: StatusMessageProps) {
    const errorConditions = ['error', 'problem']
    const isError = errorConditions.some(condition => children?.toString().toLowerCase().includes(condition))

    return (
        <>
            {children &&
                <div className={clsx(`flex items-start sm:items-center ${className ?? ''}`)}>
                    {!isError ? <CheckIcon className="size-5 mt-0.5 sm:mt-0 mr-1 text-green-800 dark:text-green-600"/>
                        : <CrossIcon className="size-5 mt-0.5 sm:mt-0 mr-1 text-red-800 dark:text-red-600"/>}
                    <p aria-live="polite" role="status"
                       className={clsx('text-sm font-semibold', !isError ? 'text-green-800 dark:text-green-600' : 'text-red-800 dark:text-red-600')}>
                        {children}
                    </p>
                </div>
            }
        </>
    )
}