'use client'

import React, {ReactNode, useRef, useState} from 'react'
import {CheckIcon} from '@/components/icons/CheckIcon'
import {CopyIcon} from '@/components/icons/CopyIcon'
import clsx from 'clsx'

export function Code({children}: { children: ReactNode }) {
    const [copied, setCopied] = useState<boolean>(false)
    const preRef = useRef<HTMLPreElement>(null)

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await navigator.clipboard.writeText(preRef.current?.innerText ?? '')
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
    }

    return (
        <pre className="relative group" ref={preRef}>
                <button
                    className="absolute top-0 right-0 m-5"
                    onClick={handleCopy} aria-label="Copy code">
                    <div className="relative size-6">
                        <CheckIcon
                            className={clsx('absolute text-green-500 ease-in transform transition', !copied ? 'scale-0' : 'scale-100')}/>
                        <CopyIcon
                            className={clsx('absolute text-zinc-400 hover:text-zinc-50 ease-in transform transition', !copied ? 'scale-100' : 'scale-0')}/>
                    </div>
                </button>
            <div className="sm:mt-0 overflow-auto">
            {children}
            </div>
        </pre>
    )
}