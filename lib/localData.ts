import path from 'path'
import {promises as fs} from 'fs'

export async function getLocalData() {
    const jsonDirectory = path.join(process.cwd(), 'json')
    return await fs.readFile(jsonDirectory + '/data.json', 'utf8')
}