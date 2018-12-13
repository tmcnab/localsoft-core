import config from '../config'
import db from '../db'
import multer from 'multer'
import uuid from 'uuid/v4'

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, config.DATA_DIR),
        filename: (req, file, cb) => cb(null, uuid())
    })
}).any()

export default (request, response, next) => {
    const {role} = request.session

    // Only staff and admins are authorized to upload files.
    if (!['STAFF', 'ADMINISTRATOR'].includes(role)) {
        const error = new Error('Unauthorized')
        error.statusCode = 401
        return next(error)
    }

    upload(request, response, err => {
        if (err instanceof multer.MulterError) {
            // TODO: A Multer error occurred when uploading.
        } else if (err) {
            // TODO: An unknown error occurred when uploading.
        } else {
            const access = role === 'STAFF' ? 'STAFF' : 'ADMINISTRATOR'
            request.files.forEach(file => {
                db.get('files')
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
