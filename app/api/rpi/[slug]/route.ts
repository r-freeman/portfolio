import {NextResponse} from 'next/server'
import {getRamUsage, getRootFsUsage, getSysLoad, getTemp, getUptime} from '@/lib/pi'

export const fetchCache = 'force-no-store'

export async function GET(request: Request, {params}: { params: { slug: string } }) {
    const slug = params.slug
    let response
    if (slug === 'ram') {
        response = await getRamUsage()
    } else if (slug === 'rootfs') {
        response = await getRootFsUsage()
    } else if (slug === 'sysload') {
        response = await getSysLoad()
    } else if (slug === 'temp') {
        response = await getTemp()
    } else if (slug === 'uptime') {
        response = await getUptime()
    } else {
        return new Response('Not Found', {
            status: 404
        })
    }

    return NextResponse.json(response)
}