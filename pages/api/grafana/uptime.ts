import {NextApiRequest, NextApiResponse} from 'next'
import {getUptime} from '@/lib/grafana'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getUptime()

    return res.status(200).json(response)
}