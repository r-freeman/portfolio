import type {Comment} from '@/types'

export function getCommentCount(comments: Comment[]) {
    return comments.reduce((acc, comment) => {
        if (!comment) return acc
        const replyCount = comment.replies?.length || 0
        return (acc + 1) + replyCount
    }, 0)
}