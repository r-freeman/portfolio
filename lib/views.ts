import {prisma} from '@/lib/prisma'

export async function getViews() {
    const totalViews: { _sum: { count: any } } = await prisma.views.aggregate({
        _sum: {
            count: true
        }
    })

    return {
        views: totalViews._sum.count.toString()
    }
}