import bcrypt from 'bcrypt'
import FileSync from 'lowdb/adapters/FileSync'
import fsUtils from 'nodejs-fs-utils'
import lowdb from 'lowdb'
import path from 'path'
import uuid from 'uuid/v4'


const __dirname = path.dirname(new URL(import.meta.url).pathname)
const PRODUCTION = process.env.NODE_ENV === 'production'
const DATA_DIR = path.join(__dirname, '..', '.data')


export default ({
    BUILD_DIR: path.join(__dirname, '..', '.build'),
    CUSTOM_THEME: false,
    DATA_DIR,
    INSTANCE_NAME: process.env.INSTANCE_NAME || 'Dev Instance',
    JEKYLL_DIR: path.join(__dirname, '..', '.jekyll', '_site'),
    PRODUCTION,
    PORT: 3001,
    SECRET: PRODUCTION ? uuid()  : 'secret',
    STORAGE_QUOTA: 0.5 * 1000 * 1000 * 1000,        // TODO: sales shit
})
