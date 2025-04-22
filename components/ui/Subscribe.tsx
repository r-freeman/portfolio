'use client'

import React, {useActionState} from 'react'
import {Button} from '@/components/ui/Button'
import {InboxIcon} from '@/components/icons/InboxIcon'
import {subscribe} from '@/app/actions/subscribe'
import {StatusMessage} from '@/components/ui/StatusMessage'

type InitialState = {
    message: string
}

const initialState: InitialState = {
    message: ''
}

export function Subscribe() {
    const [state, formAction, pending] = useActionState(subscribe, initialState)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
        }
    }

    return (
        <div className="mt-24 rounded-2xl p-px dark:bg-gradient-to-r dark:from-pink-500 dark:via-red-500 dark:to-yellow-500">
            <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 bg-white dark:bg-gray-950">
                <h2 className="flex items-center text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    <InboxIcon className="size-6"/>
                    <span className="ml-3">Stay in the loop</span>
                </h2>
                <p className="mt-2 text-base text-zinc-600 dark:text-gray-400">
                    Subscribe to my newsletter and get notified when I publish more content like this.
                </p>
                <form className="mt-6 flex flex-col sm:flex-row gap-x-2"
                      action={formAction}>
                    <input type="email" name="email" id="email" required onKeyDown={handleKeyDown}
                           placeholder="Your email address"
                           className="rounded-md px-3 py-1.5 text-base text-zinc-600 dark:text-zinc-400 bg-[#fafafa] dark:bg-[#121212] border-[1px] dark:border-zinc-700/40 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 focus:dark:outline-indigo-600"/>
                    <Button variant="secondary" className="mt-2 sm:mt-0" disabled={pending}>
                        Subscribe
                    </Button>
                    <StatusMessage className="mt-2 sm:mt-0 sm:ml-2" errorConditions={['already']}>{state?.message}</StatusMessage>
                </form>
            </div>
        </div>
    )
}