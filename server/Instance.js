import Adapter from 'lowdb/adapters/FileSync.js'
import bcrypt from 'bcrypt'
import config from './config.js'
import lowdb from 'lowdb'
import mkdirp from 'mkdirp'
import path from 'path'
import {Roles} from './enums.js'
import uuid from 'uuid'

export default class Instance {
    static async create(hostname) {
        // Create all necessary directories.
        const rootDir = path.join(config.DATA_DIR, hostname)
        mkdirp.sync(rootDir)
        mkdirp.sync(path.join(rootDir, 'files'))
        mkdirp.sync(path.join(rootDir, 'conversations'))

        // Create all defaults.
        const instance = new Instance(hostname)
        instance.changelog
            .defaults({
                records: []
            })
            .write()
        instance.conversations
            .defaults({
                enabled: false,
                records: []
            })
            .write()
        instance.emails
            .defaults({
                enabled: false,
                records: []
            })
            .write()
        instance.files
            .defaults({
                enabled: false,
                records: []
            })
            .write()
        instance.pages
            .defaults({
                enabled: false,
                records: []
            })
            .write()
        instance.people._raw
            .defaults({
                enabled: true,
                records: [
                    {
                        email: `administrator@${hostname}`,
                        hash: bcrypt.hashSync('administrator', 10),
                        identifier: uuid(),
                        role: Roles.ADMINISTRATOR,
						tags: []
                    }
                ]
            })
            .write()
        instance.settings
            .defaults({
				full_title: '',
				hostname,
                external_media: {
                    facebook: '',
                    github: '',
                    instagram: '',
                    medium: '',
                    reddit: '',
                    slack: '',
                    twitter: ''
                }
            })
            .write()
    }

    constructor(hostname) {
        this._directory = path.join(config.DATA_DIR, hostname)
        mkdirp.sync(this._directory)
        mkdirp.sync(path.join(this._directory, 'files'))
    }

    get changelog() {
        return this._dbFor('changelog')
    }

    get conversations() {
        return this._dbFor('conversations')
    }

    get emails() {
        return this._dbFor('emails')
    }

    get files() {
        return this._dbFor('files')
    }

    get pages() {
        return this._dbFor('pages')
    }

    get people() {
        const db = this._dbFor('people')
        return {
            get enabled() {
                return db.get('enabled').value()
            },
            get records() {
                return db.get('records')
            },
            get _raw() {
                return db
            }
        }
    }

    get settings() {
        return this._dbFor('settings')
    }

    _dbFor(name) {
        const filename = path.join(this._directory, `${name}.json`)
        const adapter = new Adapter(filename)
        return lowdb(adapter)
    }
}
