import {NextApiRequest, NextApiResponse} from 'next'
import {getPiTemp} from '@/lib/grafana'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getPiTemp()

    return res.status(200).json(response)
}