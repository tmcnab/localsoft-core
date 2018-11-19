import config from './config'
import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'


export const init = () => {
    const mkdirForSync = (dir) => {
        const joinedPath = path.join(config.DATA_DIR, dir)
        mkdirp.sync(joinedPath)
    }

    // Create the data directory.
    mkdirp.sync(config.DATA_DIR)

    // Make all the subdirectories.
    mkdirForSync('conversations')
    mkdirForSync('emails')
    mkdirForSync('events')
    mkdirForSync('files')
    mkdirForSync('forums')
    mkdirForSync('pages')
    mkdirForSync('people')
    mkdirForSync('updates')

    // Create config file if not exists.
    const configFile = path.join(config.DATA_DIR, 'config.json')
    if (!fs.existsSync(configFile)) {
        const configData = JSON.stringify({
            'shortname': 'Shortname',
            'longname': 'Instance Longname'
        }, null, 2)

        fs.writeFileSync(configFile, configData, 'utf8')
    }
}
