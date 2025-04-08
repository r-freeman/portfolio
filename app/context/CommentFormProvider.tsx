import {createContext, ReactNode, RefObject, useContext, useRef} from 'react'

type CommentFormContext = {
    commentFormRef?: RefObject<HTMLTextAreaElement | null>
    focusCommentForm: () => void
}

export const CommentFormContext = createContext<CommentFormContext | null>(null)

export const useCommentFormContext = () => useContext(CommentFormContext)

export default function CommentFormProvider({children}: { children: ReactNode }) {
    const commentFormRef = useRef<HTMLTextAreaElement>(null)

    const focusCommentForm = () => {
        commentFormRef.current?.focus()
    }

    return (
        <CommentFormContext.Provider value={{commentFormRef, focusCommentForm}}>
            {children}
        </CommentFormContext.Provider>
    )
}