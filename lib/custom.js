import fs from 'fs';

export function getCustomData(file) {
    const path = `${process.env.dataDirectory}/${file}`;

    return JSON.parse(fs.readFileSync(path));
}
