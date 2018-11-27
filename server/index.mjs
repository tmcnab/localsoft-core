import compression from 'compression'
import cookieSession from 'cookie-session'
import config, {db} from './config'
import express from 'express'
import expressGraphQL from 'express-graphql'
import helmet from 'helmet'
import http from 'http'
import multer from 'multer'
import path from 'path'
import schema from './schema'
import uuid from 'uuid/v4'



// Create app and configure settings.
const app = express()
app.set('port', config.PORT)
app.set('trust proxy', config.PRODUCTION)


// Register middlewares.
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Configure sessions.
app.use(cookieSession({
    secret: config.SECRET,
    secure: config.PRODUCTION,      // true in production
}))
app.use((req, res, next) => {
    // Make sure every session has a role, even if ANONYMOUS
    req.session.role = req.session.role || 'ANONYMOUS'
    next()
})

// Configure graphql.
app.use('/graphql', expressGraphQL({
    graphiql: !config.PRODUCTION,
    schema,
}))

// Configure uploads.
const onlyStaffAndAdmins = (req, res, next) => {
    const {role} = req.session
    if (!['STAFF', 'ADMINISTRATOR'].includes(role)) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }
    next()
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, config.DATA_DIR),
        filename: (req, file, cb) => cb(null, uuid())
    })
})

app.post('/upload', onlyStaffAndAdmins, upload.any(), (request, response) => {
    const access = request.session.role === 'STAFF' ? 'STAFF' : 'ADMINISTRATOR'
    request.files.forEach(file => {
        db.get('files').push({
            access,
            description: "",
            identifier: file.filename,
            mimeType: file.mimetype,
            name: file.originalname,
            size: file.size,
            tags: [],
            uploaded: new Date().toISOString(),
        }).write()
    })
    response.status(201).json({status: 'success'})
})

// Ability for users to download files.
app.get('/files/:identifier', (request, response) => {
    const {identifier} = request.params
    const record = db.get('files').find({identifier}).value()

    // No record? 404.
    if (!record) {
        return response.sendStatus(404)
    }

    // Where file is located on disk.
    const file = path.join(config.DATA_DIR, identifier)

    // TODO: restrict by role on record/request.session.role (404 to prevent leakage)
    response.download(file, file.name)
})


// In production we serve the build directory from static
if (config.PRODUCTION) {
    app.use(express.static(config.BUILD_DIR))
}

http.createServer(app).listen(config.PORT)
