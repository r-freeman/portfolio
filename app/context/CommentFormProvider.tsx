import {createContext, ReactNode, RefObject, useContext, useRef, useState} from 'react'
import {Comment} from '@/types'

type CommentFormContext = {
    commentFormRef?: RefObject<HTMLTextAreaElement | null>
    focusCommentForm: () => void
    commentLength: number
    setCommentLength: (commentLength: number) => void
    commentMaxLength: number
    replyTo: Comment | null
    setReplyTo: (replyTo: Comment | null) => void
}

export const CommentFormContext = createContext<CommentFormContext | null>(null)

export const useCommentFormContext = () => useContext(CommentFormContext)

export default function CommentFormProvider({children}: { children: ReactNode }) {
    const [replyTo, setReplyTo] = useState<Comment | null>(null)
    const [commentLength, setCommentLength] = useState<number>(0)
    const commentFormRef = useRef<HTMLTextAreaElement>(null)
    const commentMaxLength = 500

    const focusCommentForm = () => {
        commentFormRef.current?.focus()
    }

    return (
        <CommentFormContext.Provider
            value={{commentFormRef, focusCommentForm, commentLength, setCommentLength, commentMaxLength, replyTo, setReplyTo}}>
            {children}
        </CommentFormContext.Provider>
    )
}