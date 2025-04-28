'use client'

import React, {useActionState, useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import {addComment, loginWithGitHub} from '@/app/actions/comments'
import {Button} from '@/components/ui/Button'
import {GitHubIcon} from '@/components/icons/SocialIcons'
import {ArrowLeftIcon} from '@/components/icons/ArrowLeftIcon'
import {StatusMessage} from '@/components/ui/StatusMessage'
import {getShortDurationFromNow, truncateDatetime} from '@/lib/dateFns'
import CommentFormProvider, {useCommentFormContext} from '@/app/context/CommentFormProvider'

import type {Comment} from '@/types'

type ReplyButton = {
    comment: Comment
}


Comments.ReplyButton = function ReplyButton({comment}: ReplyButton) {
    const commentFormContext = useCommentFormContext()
    const {data: session} = useSession()

    const handleReplyButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!session) {
            await loginWithGitHub()
        }
        commentFormContext?.setCommentLength(0)
        commentFormContext?.commentFormRef?.current?.form?.reset()
        commentFormContext?.setReplyTo(comment);
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

Comments.Comment = function Comment({comment, isReply = false, className}: {
    comment: Comment,
    isReply?: boolean
    className?: string
}) {
    return (
        <>
            <article
                className={clsx('flex gap-x-4 py-5', `${className ?? ''}`, isReply && 'ml-[66px] border-l border-zinc-100 pl-6 dark:border-zinc-700/40')}>
                <Image src={comment.user.image} alt={comment.user.name} width={64} height={64}
                       className={clsx('rounded-full', isReply ? 'size-8' : 'size-12')}/>
                <div className="flex-auto">
                    <div className="flex items-baseline gap-x-1">
                        <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">
                            <Link href={`https://github.com/${comment.user.username ?? ''}`}>{comment.user.name}</Link>
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            <time dateTime={truncateDatetime(comment.created_at)}>
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
                                comment.replies.map((reply, i) => (
                                    <Comments.Comment key={reply.id} comment={reply} isReply={true}
                                                      className={`${i + 1 === comment.replies?.length ? 'mb-6' : ''}`}/>
                                )) : null
                            }
                        </React.Fragment>
                    ))}
                </section>
            }
        </>
    )
}

type InitialState = {
    message: string
}

const initialState: InitialState = {
    message: ''
}

Comments.Form = function Form({slug}: { slug: string }) {
    const [parentId, setParentId] = useState<string | number | null>('')
    const [state, formAction, pending] = useActionState(addComment, initialState)
    const {data: session} = useSession()
    const commentFormContext = useCommentFormContext()
    const commentFormRef = commentFormContext?.commentFormRef

    useEffect(() => {
        if (commentFormContext?.replyTo?.parent_id !== null) {
            setParentId(commentFormContext?.replyTo?.parent_id ?? '')
        } else {
            setParentId(commentFormContext?.replyTo?.id)
        }
    }, [commentFormContext?.replyTo])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
        }

        if (e.key === 'Escape' && commentFormContext?.replyTo !== null) {
            commentFormContext?.setReplyTo(null)
            commentFormRef?.current?.blur()
        }
    }

    const handleSubmit = () => {
        commentFormContext?.setReplyTo(null)
        commentFormContext?.setCommentLength(0)
    }

    const handleCancel = () => {
        commentFormContext?.setReplyTo(null)
        commentFormContext?.setCommentLength(0)
        commentFormRef?.current?.form?.reset()
    }

    return (
        <div className="mt-16">
            {!session ?
                <form action={async () => await loginWithGitHub()}>
                    <Button variant="secondary">
                        <GitHubIcon className="w-6 h-6 dark:fill-white"/>Sign in to comment
                    </Button>
                </form> :
                <form action={formAction} onSubmit={handleSubmit}>
                    <div className="flex gap-x-4">
                        {session?.user?.image !== null &&
                            <Image className="size-12 rounded-full" src={session?.user?.image ?? ''}
                                   alt={session?.user?.name ?? ''}
                                   width={64} height={64}/>
                        }
                        <div className="flex-1">
                            <textarea
                                id="comment"
                                name="comment"
                                rows={4}
                                className="resize-none block w-full rounded-md px-3 py-1.5 text-base text-zinc-600 dark:text-zinc-400 bg-[#fafafa] dark:bg-[#121212] border-[1px] dark:border-zinc-700/40 -outline-offset-1 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 focus:dark:outline-indigo-600"
                                onKeyDown={handleKeyDown}
                                onChange={(e) => commentFormContext?.setCommentLength(e.target.value.length ?? 0)}
                                disabled={pending}
                                defaultValue={''}
                                maxLength={commentFormContext?.commentMaxLength}
                                ref={commentFormRef}
                                placeholder={`${commentFormContext?.replyTo ? `Reply to ${commentFormContext.replyTo.user.name}` : 'Add a comment'}`}
                                required
                            />
                            <input type="hidden" name="parent_id" value={parentId ?? ''}/>
                            <input type="hidden" name="slug" value={slug}/>
                            <div className="mt-2 flex justify-between items-center gap-x-4">
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{`${commentFormContext?.commentLength} / ${commentFormContext?.commentMaxLength}`}</p>
                                <div className="flex gap-x-4">
                                    {commentFormContext?.replyTo &&
                                        <button
                                            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-50"
                                            onClick={handleCancel}>Cancel</button>
                                    }
                                    <Button variant="secondary" disabled={pending}>
                                        Comment
                                    </Button>
                                </div>
                            </div>
                            <StatusMessage className="mt-2">
                                {state.message}
                            </StatusMessage>
                        </div>
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

export function Comments({slug, comments}: CommentsProps) {
    return (
        <CommentFormProvider>
            <div className="mt-24">
                {comments &&
                    <Comments.List comments={comments}/>
                }
                <Comments.Form slug={slug}/>
            </div>
        </CommentFormProvider>
    )
}