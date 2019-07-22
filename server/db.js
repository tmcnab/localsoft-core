import config from './config.js'
import FileSync from 'lowdb/adapters/FileSync.js'
import lowdb from 'lowdb'
import path from 'path'

const file = path.join(config.DATA_DIR, 'localsoft.json')
const adapter = new FileSync(file)

const db = lowdb(adapter)

Object.defineProperties(db, {
    account: {get: () => db.get('account')},
    conversations: {
        get: () => lowdb(new FileSync(path.join(config.DATA_DIR, 'conversations.json')))
    },
    emails: {get: () => db.get('emails')},
    files: {get: () => db.get('files')},
    pages: {get: () => db.get('pages')},
    people: {get: () => db.get('people')}
})

export default db
