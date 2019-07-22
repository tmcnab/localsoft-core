import config from '../config.js'
import db from '../db.js'
import multer from 'multer'
import path from 'path'
import {Roles} from '../enums.js'
import uuid from 'uuid'

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, config.DATA_DIR),
        filename: (req, file, cb) => cb(null, uuid())
    })
}).any()

export const fileDownload = (request, response, next) => {
    const {identifier} = request.params

    const record = db.files.find({identifier}).value()
    if (!record) {
        return next(new Error(404))
    }

    // TODO: restrict by role on record/request.session.role (404 to prevent leakage) [@tmcnab]
    const file = path.join(config.DATA_DIR, identifier)
    response.download(file, file.name)
}

export const fileUpload = (request, response, next) => {
    const {role} = request.session

    // Only staff and admins are authorized to upload files (for now).
    if (!request.session.hasRole(Roles.STAFF, Roles.ADMINISTRATOR)) {
        return next(new Error(401))
    }

    upload(request, response, err => {
        if (err instanceof multer.MulterError) {
            // TODO: A Multer error occurred when uploading.
        } else if (err) {
            // TODO: An unknown error occurred when uploading.
        } else {
            const access = role === 'STAFF' ? 'STAFF' : 'ADMINISTRATOR'
            request.files.forEach(file => {
                db.files
                    .push({
                        access,
                        description: '',
                        identifier: file.filename,
                        mimeType: file.mimetype,
                        name: file.originalname,
                        size: file.size,
                        tags: [],
                        uploaded: new Date().toISOString()
                    })
                    .write()
            })
            response.status(201).json({status: 'success'})
        }
    })
}
