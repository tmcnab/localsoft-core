import path from 'path'
import uuid from 'uuid/v4'


const __dirname = path.dirname(new URL(import.meta.url).pathname)
const PRODUCTION = process.env.NODE_ENV === 'production'


export default ({
    BUILD_DIR: path.join(__dirname, '..', '.build'),
    DATA_DIR: path.join(__dirname, '..', '.data'),
    PRODUCTION,
    PORT: 3001,
    SECRET: PRODUCTION ? uuid()  : 'secret'
})
