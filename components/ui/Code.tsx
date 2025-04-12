'use client'

import React, {ReactNode, useRef, useState} from 'react'
import {CopyIcon} from '@/components/icons/CopyIcon'
import {CheckIcon} from '@/components/icons/CheckIcon'

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
        <pre className="relative" ref={preRef}>
                <button className="absolute top-0 right-0 m-5" onClick={handleCopy} aria-label="Copy code">
                {copied ? <CheckIcon className="size-6 text-green-500"/> :
                    <CopyIcon className="size-6 text-zinc-400 hover:text-zinc-50"/>}
                </button>
            <div className="mt-5 sm:mt-0 pb-5 overflow-auto ">
            {children}
            </div>
        </pre>
    )
}