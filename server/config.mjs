import FileSync from 'lowdb/adapters/FileSync'
import lowdb from 'lowdb'
import mkdirp from 'mkdirp'
import path from 'path'
import uuid from 'uuid/v4'


const __dirname = path.dirname(new URL(import.meta.url).pathname)
const PRODUCTION = process.env.NODE_ENV === 'production'
const DATA_DIR = path.join(__dirname, '..', '.data')

// Create the data directory (if not exists).
mkdirp.sync(DATA_DIR)

export const db = lowdb(new FileSync(path.join(DATA_DIR, 'config.json')))

export default ({
    BUILD_DIR: path.join(__dirname, '..', '.build'),
    DATA_DIR,
    PRODUCTION,
    PORT: 3001,
    SECRET: PRODUCTION ? uuid()  : 'secret'
})
