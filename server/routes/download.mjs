import config from '../config'
import db from '../db'
import path from 'path'

export default (request, response) => {
    const {identifier} = request.params
    const record = db
        .get('files')
        .find({identifier})
        .value()

    // No record? 404.
    if (!record) {
        return response.sendStatus(404)
    }

    // Where file is located on disk.
    const file = path.join(config.DATA_DIR, identifier)

    // TODO: restrict by role on record/request.session.role (404 to prevent leakage)
    response.download(file, file.name)
}
