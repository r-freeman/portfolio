'use client'

import React, {ReactNode, useActionState} from 'react'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import clsx from 'clsx'
import {addComment, loginWithGitHub} from '@/app/actions/comments'
import {Button} from '@/components/ui/Button'
import {GitHubIcon} from '@/components/icons/SocialIcons'
import {formatDistanceToNow} from 'date-fns'

type Comment = {
    id: number
    content: string
    created_at: string
    user: {
        id: number
        name: string
        image: string
    }
}

Comments.Comment = function Comment({comment, isReply = false}: { comment: Comment, isReply?: boolean }) {
    return (
        <article className="flex gap-x-4 py-5">
            <Image src={comment.user.image} alt={comment.user.name} width={64} height={64}
                   className="size-12 rounded-full"/>
            <div className="flex-auto">
                <div className="flex items-baseline gap-x-1">
                    <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">{comment.user.name}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        <time dateTime={comment.created_at}>
                            <span>&middot; {`${formatDistanceToNow(comment.created_at)} ago`}</span>
                        </time>
                    </p>
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">{comment.content}</p>
            </div>
        </article>
    )
}

type CommentsListProps = {
    comments: Comment[]
}

Comments.List = function List({comments}: CommentsListProps) {
    return (
        <>
            {comments.length > 0 &&
                <section>
                    <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
                        Comments
                    </h3>
                    {comments.map((comment) => (
                        <Comments.Comment key={comment.id} comment={comment}/>
                    ))}
                </section>
            }
        </>
    )
}

type CommentsStatusProps = {
    children: ReactNode
}

Comments.Status = function Status({children}: CommentsStatusProps) {
    const conditions = ['error', 'problem']
    const isError = conditions.some(condition => children?.toString().toLowerCase().includes(condition))

    return (
        <p aria-live="polite" role="status"
           className={clsx('text-sm font-semibold',
               !isError ? 'text-green-800 dark:text-green-600' : 'text-red-800 dark:text-red-600')}>
            {children}
        </p>
    )
}

type InitialState = {
    message: string
}

const initialState: InitialState = {
    message: ''
}

Comments.Form = function Form({slug}: CommentsProps) {
    const [state, formAction, pending] = useActionState(addComment, initialState)
    const {data: session} = useSession()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
        }
    }

    return (
        <div className="mt-12">
            {!session ?
                <form action={async () => await loginWithGitHub()}>
                    <Button variant="secondary">
                        <GitHubIcon className="w-6 h-6 dark:fill-white"/>Sign in to comment
                    </Button>
                </form> :
                <form action={formAction}>
                    <label htmlFor="comment"
                           className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                        Add a comment
                    </label>
                    <div className="mt-2 flex">
                            <textarea
                                id="comment"
                                name="comment"
                                rows={4}
                                className="resize-none block w-full rounded-md px-3 py-1.5 text-base text-zinc-600 dark:text-zinc-400 bg-[#fafafa] dark:bg-[#121212] border-[1px] dark:border-zinc-700/40 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 focus:dark:outline-indigo-600"
                                onKeyDown={handleKeyDown}
                                disabled={pending}
                                defaultValue={''}
                                maxLength={255}
                                required
                            />
                    </div>
                    <input type="hidden" name="slug" value={slug}/>
                    <div className="mt-2 flex justify-between items-start gap-x-4">
                        <Comments.Status>
                            {state?.message}
                        </Comments.Status>
                        <Button variant="secondary" disabled={pending}>
                            Comment
                        </Button>
                    </div>
                </form>
            }
        </div>
    )
}

type CommentsProps = {
    slug: string
    comments?: any
}

export default function Comments({slug, comments}: CommentsProps) {
    return (
        <div className="mt-24">
            {comments &&
                <Comments.List comments={comments}/>
            }
            <Comments.Form slug={slug}/>
        </div>
    )
}