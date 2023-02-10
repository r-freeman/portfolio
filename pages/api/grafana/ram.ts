import {NextApiRequest, NextApiResponse} from 'next'
import {getRamUsage} from '@/lib/grafana'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getRamUsage()

    return res.status(200).json(response)
}