import bcrypt from 'bcrypt'
import FileSync from 'lowdb/adapters/FileSync'
import fsUtils from 'nodejs-fs-utils'
import lowdb from 'lowdb'
import path from 'path'
import uuid from 'uuid/v4'


const __dirname = path.dirname(new URL(import.meta.url).pathname)
const PRODUCTION = process.env.NODE_ENV === 'production'
const DATA_DIR = path.join(__dirname, '..', '.data')


// Create the data directory (if not exists).
fsUtils.mkdirsSync(DATA_DIR)


// Set default configuration in data store.
export const db = lowdb(new FileSync(path.join(DATA_DIR, 'config.json')))
db.defaults({
    conversations: {},
    email: [],
    events: [],
    files: [],
    forums: {},
    people: [],
    pages: [],
    settings: {},
}).write()

// If there are no administrators then add the default one.
const administrators = db.get('people').filter({ role: 'ADMINISTRATOR' }).value()
if (!administrators.length) {
    db.get('people').push({
        email: 'user@domain.tld',
        identifier: uuid(),
        hash: bcrypt.hashSync('password', 10),
        preferences: {
            email: false,
        },
        role: 'ADMINISTRATOR',
    }).write()
}


export default ({
    BUILD_DIR: path.join(__dirname, '..', '.build'),
    DATA_DIR,
    INSTANCE_NAME: process.env.INSTANCE_NAME || 'Dev Instance',
    PRODUCTION,
    PORT: 3001,
    SECRET: PRODUCTION ? uuid()  : 'secret',
    STORAGE_QUOTA: 0.5 * 1000 * 1000 * 1000,        // TODO: sales shit
})
