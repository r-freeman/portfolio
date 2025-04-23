import {createContext, ReactNode, RefObject, useContext, useRef, useState} from 'react'

type CommentFormContext = {
    commentFormRef?: RefObject<HTMLTextAreaElement | null>
    focusCommentForm: () => void
    commentLength: number
    setCommentLength: (commentLength: number) => void
    commentMaxLength: number
}

export const CommentFormContext = createContext<CommentFormContext | null>(null)

export const useCommentFormContext = () => useContext(CommentFormContext)

export default function CommentFormProvider({children}: { children: ReactNode }) {
    const [commentLength, setCommentLength] = useState<number>(0)
    const commentFormRef = useRef<HTMLTextAreaElement>(null)
    const commentMaxLength = 300

    const focusCommentForm = () => {
        commentFormRef.current?.focus()
    }

    return (
        <CommentFormContext.Provider
            value={{commentFormRef, focusCommentForm, commentLength, setCommentLength, commentMaxLength}}>
            {children}
        </CommentFormContext.Provider>
    )
}