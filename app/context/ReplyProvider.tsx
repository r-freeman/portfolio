import {createContext, ReactNode, useContext, useState} from 'react'
import type {Comment} from '@/types'

type ReplyContext = {
    replyTo: Comment | null
    setReplyTo: (replyTo: Comment | null) => void
}

export const ReplyContext = createContext<ReplyContext | null>(null)

export const useReplyContext = () => useContext(ReplyContext)

export default function ReplyProvider({children}: { children: ReactNode }) {
    const [replyTo, setReplyTo] = useState<Comment | null>(null)

    return (
        <ReplyContext.Provider value={{replyTo, setReplyTo}}>{children}</ReplyContext.Provider>
    )
}