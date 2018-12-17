import __dirname from './__dirname'
import {Features} from './enums'
import path from 'path'
import uuid from 'uuid/v4'

const PRODUCTION = process.env.NODE_ENV === 'production'
const DATA_DIR = path.join(__dirname, '..', '.data')

export default {
    CUSTOM_THEME: false,
    DATA_DIR,
    ENABLED_FEATURES: [Features.EMAIL, Features.FILES, Features.PAGES, Features.PEOPLE],
    INSTANCE_NAME: process.env.INSTANCE_NAME || 'Dev Instance',
    JEKYLL_DIR: path.join(__dirname, '..', '.jekyll'),
    JEKYLL_BUILD_DIR: path.join(__dirname, '..', '.jekyll', '_site'),
    PRODUCTION,
    PORT: 3001,
    REACT_BUILD_DIR: path.join(__dirname, '..', '.build'),
    SECRET: PRODUCTION ? uuid() : 'secret',
    STORAGE_QUOTA: 0.5 * 1000 * 1000 * 1000
}
