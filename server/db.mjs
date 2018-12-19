import config from './config'
import FileSync from 'lowdb/adapters/FileSync'
import lowdb from 'lowdb'
import path from 'path'

const file = path.join(config.DATA_DIR, 'localsoft.json')
const adapter = new FileSync(file)

const db = lowdb(adapter)

Object.defineProperties(db, {
    account: {get: () => db.get('account')},
    emails: {get: () => db.get('emails')},
    files: {get: () => db.get('files')},
    pages: {get: () => db.get('pages')},
    people: {get: () => db.get('people')}
})

export default db
