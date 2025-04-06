'use client'

import React, {createContext, ReactNode, RefObject, useActionState, useContext, useEffect, useRef, useState} from 'react'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import clsx from 'clsx'
import {addComment, loginWithGitHub} from '@/app/actions/comments'
import {Button} from '@/components/ui/Button'
import {GitHubIcon} from '@/components/icons/SocialIcons'
import {ArrowLeftIcon} from '@/components/icons/ArrowLeftIcon'
import {getShortDurationFromNow} from '@/lib/dateFns'

type Comment = {
    id: number
    content: string
    created_at: string
    parent_id: number | null
    user: {
        id: number
        name: string
        image: string
    }
    replies?: Comment[]
}

type ReplyButton = {
    comment: Comment
}

Comments.ReplyButton = function ReplyButton({comment}: ReplyButton) {
    const replyContext = useContext(ReplyContext)
    const commentFormContext = useContext(CommentFormContext)
    const {data: session} = useSession()

    const handleReplyButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!session) {
            await loginWithGitHub()
        }
        replyContext?.setReplyTo(comment);
        commentFormContext?.focusCommentForm()
    }

    return (
        <button
            className="flex mt-4 text-sm gap-x-2 items-center group active:dark:text-indigo-500 active:text-indigo-500 text-zinc-800 dark:text-zinc-100"
            onClick={handleReplyButton}
        >
            <ArrowLeftIcon
                className="w-4 h-4 stroke-zinc-500 dark:stroke-zinc-400 group-active:dark:stroke-indigo-500 group-active:stroke-indigo-500"/>Reply
        </button>
    )
}

Comments.Comment = function Comment({comment, isReply = false}: {
    comment: Comment,
    isReply?: boolean
}) {
    return (
        <>
            <article
                className={clsx('flex gap-x-4 py-5', isReply && 'ml-[62px] border-l border-zinc-100 pl-6 dark:border-zinc-700/40')}>
                <Image src={comment.user.image} alt={comment.user.name} width={64} height={64}
                       className={clsx('rounded-full', isReply ? 'size-8' : 'size-12')}/>
                <div className="flex-auto">
                    <div className="flex items-baseline gap-x-1">
                        <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">{comment.user.name}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            <time dateTime={comment.created_at}>
                                <span>&middot; {`${getShortDurationFromNow(comment.created_at)}`}</span>
                            </time>
                        </p>
                    </div>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">{comment.content}</p>
                    <Comments.ReplyButton comment={comment}/>
                </div>
            </article>
        </>
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
                        <React.Fragment key={comment.id}>
                            <Comments.Comment comment={comment}/>
                            {(typeof comment.replies !== 'undefined' && comment.replies.length > 0) ?
                                comment.replies.map(reply => (
                                    <Comments.Comment key={reply.id} comment={reply} isReply={true}/>
                                )) : null
                            }
                        </React.Fragment>
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
    const errorConditions = ['error', 'problem']
    const isError = errorConditions.some(condition => children?.toString().toLowerCase().includes(condition))

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

const CommentFormContext = createContext<{ focusCommentForm: () => void } | null>(null)

type CommentsFormsProps = {
    slug: string
    commentFormRef?: RefObject<HTMLTextAreaElement | null>
}

Comments.Form = function Form({slug, commentFormRef}: CommentsFormsProps) {
    const [parentId, setParentId] = useState<string | number | null>('')
    const [state, formAction, pending] = useActionState(addComment, initialState)
    const {data: session} = useSession()
    const replyContext = useContext(ReplyContext)

    useEffect(() => {
        if (replyContext?.replyTo?.parent_id !== null) {
            setParentId(replyContext?.replyTo?.parent_id ?? '')
        } else {
            setParentId(replyContext?.replyTo?.id)
        }
    }, [replyContext?.replyTo])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
        }

        if (e.key === 'Escape' && replyContext?.replyTo !== null) {
            replyContext?.setReplyTo(null)
            commentFormRef?.current?.blur()
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
                <form action={formAction} onSubmit={() => replyContext?.setReplyTo(null)}>
                    <label htmlFor="comment"
                           className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                        {replyContext?.replyTo ? `Reply to ${replyContext?.replyTo.user.name}` : 'Add a comment'}
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
                                ref={commentFormRef}
                                required
                            />
                    </div>
                    <input type="hidden" name="parent_id" value={parentId ?? ''}/>
                    <input type="hidden" name="slug" value={slug}/>
                    <div className="mt-2 flex justify-between items-start gap-x-4">
                        <Comments.Status>
                            {state?.message}
                        </Comments.Status>
                        <div className="flex gap-x-4">
                            {replyContext?.replyTo &&
                                <button className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-50"
                                        onClick={() => replyContext?.setReplyTo(null)}>Cancel</button>
                            }
                            <Button variant="secondary" disabled={pending}>
                                Comment
                            </Button>
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}


type ReplyContextType = {
    replyTo: Comment | null
    setReplyTo: (replyTo: Comment | null) => void
}

const ReplyContext = createContext<ReplyContextType | null>(null)

type CommentsProps = {
    slug: string
    comments?: Comment[]
}

export default function Comments({slug, comments}: CommentsProps) {
    const [replyTo, setReplyTo] = useState<Comment | null>(null)
    const commentFormRef = useRef<HTMLTextAreaElement>(null)

    const focusCommentForm = () => {
        commentFormRef.current?.focus()
    }

    return (
        <ReplyContext.Provider value={{replyTo, setReplyTo}}>
            <CommentFormContext.Provider value={{focusCommentForm}}>
                <div className="mt-24">
                    {comments &&
                        <Comments.List comments={comments}/>
                    }
                    <Comments.Form slug={slug} commentFormRef={commentFormRef}/>
                </div>
            </CommentFormContext.Provider>
        </ReplyContext.Provider>
    )
}