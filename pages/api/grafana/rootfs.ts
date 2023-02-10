import {NextApiRequest, NextApiResponse} from 'next'
import {getRootFsUsage} from '@/lib/grafana'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getRootFsUsage()

    return res.status(200).json(response)
}