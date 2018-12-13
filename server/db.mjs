import config from './config'
import FileSync from 'lowdb/adapters/FileSync'
import lowdb from 'lowdb'
import path from 'path'

const file = path.join(config.DATA_DIR, 'localsoft.json')
const adapter = new FileSync(file)

export default lowdb(adapter)
