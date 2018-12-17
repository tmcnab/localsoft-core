import config from './config'
import FileSync from 'lowdb/adapters/FileSync'
import lowdb from 'lowdb'
import path from 'path'

const file = path.join(config.DATA_DIR, 'localsoft.json')
const adapter = new FileSync(file)

const db = lowdb(adapter)

Object.defineProperties(db, {
    account: {get: () => db.get('account')},
    pages: {get: () => db.get('pages')},
    people: {get: () => db.get('people')}
})

export default db
