import compression from 'compression'
import config from './config'
import cookieSession from 'cookie-session'
import db from './db'
import download from './routes/download'
import express from 'express'
import expressGraphQL from 'express-graphql'
import helmet from 'helmet'
import http from 'http'
import patch from './routes/patch'
import path from 'path'
import schema from './schema'
import unsubscribe from './routes/unsubscribe'
import upload from './routes/upload'
import './init'

// Create app and configure settings.
const app = express()
app.set('port', config.PORT)
app.set('trust proxy', config.PRODUCTION)

// Register middlewares.
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Configure sessions.
app.use(
    cookieSession({
        secret: config.SECRET,
        secure: config.PRODUCTION // true in production
    })
)
app.use((req, res, next) => {
    // Make sure every session has a role, even if ANONYMOUS
    req.session.role = req.session.role || 'ANONYMOUS'
    req.session.hasRole = (...roles) => roles.includes(req.session.role)
    next()
})

// Configure graphql.
app.use(
    '/graphql',
    expressGraphQL({
        graphiql: !config.PRODUCTION,
        schema
    })
)

// Register custom route handlers.
app.patch('/:resource/', patch)
app.get('/files/:identifier', download)
app.post('/upload/', upload)
app.get('/unsubscribe/', unsubscribe)

const jekyllIndexFile = path.join(config.JEKYLL_DIR, 'index.html')
app.get('/', (request, response) => response.sendFile(jekyllIndexFile))

app.use(express.static(config.JEKYLL_DIR))
app.use(express.static(config.BUILD_DIR))

const reactIndexFile = path.join(config.BUILD_DIR, 'index.html')
app.get(['/events', '/people', '/dashboard'], (request, response) => response.sendFile(reactIndexFile))

// If there is a page, serve it up
const pagePaths = db
    .get('pages')
    .value()
    .map(page => `${page.path}`)

app.get(pagePaths, (request, response) => {
    const requestPath = request.path.endsWith('/') ? request.path.slice(0, -1) : request.path
    const page = db
        .get('pages')
        .find({path: requestPath})
        .value()

    const name = page.post ? `posts/${page.published.split('T')[0]}/${page.name}.html` : `${page.name}.html`
    const file = path.join(config.JEKYLL_DIR, name)
    response.sendFile(file)
})

// Error Handler.
app.use((error, request, response) => {
    const file = path.join(config.JEKYLL_DIR, '404.html')
    response.status(404).sendFile(file)
})

http.createServer(app).listen(config.PORT)
