import clsx from 'clsx'
import React, {ReactNode} from 'react'
import {CheckIcon} from '@/components/icons/CheckIcon'
import {CrossIcon} from '@/components/icons/CrossIcon'

type StatusMessageProps = {
    children: ReactNode
    className?: string
    errorConditions?: string[]
}

export function StatusMessage({children, className, errorConditions}: StatusMessageProps) {
    const _errorConditions = ['error', 'problem', ...errorConditions ?? []]
    const isError = _errorConditions.some(condition => children?.toString().toLowerCase().includes(condition))

    return (
        <>
            {children &&
                <div
                    className={clsx(`flex items-start sm:items-center ${className ?? ''}, ${isError ? 'text-red-800 dark:text-red-500' : 'text-green-800 dark:text-green-500'}`)}>
                    {!isError ? <CheckIcon className="size-5 mt-0.5 sm:mt-0 mr-1"/>
                        : <CrossIcon className="size-5 mt-0.5 sm:mt-0 mr-1 "/>}
                    <p aria-live="polite" role="status"
                       className="text-sm font-semibold">
                        {children}
                    </p>
                </div>
            }
        </>
    )
}