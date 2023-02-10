import {NextApiRequest, NextApiResponse} from 'next'
import {getSysLoad} from '@/lib/grafana'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await getSysLoad()

    return res.status(200).json(response)
}