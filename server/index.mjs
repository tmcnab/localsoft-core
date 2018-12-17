import compression from 'compression'
import config from './config'
import cookieSession from 'cookie-session'
import download from './routes/download'
import dynamicPages from './routes/dynamicPages'
import express from 'express'
import expressGraphQL from 'express-graphql'
import helmet from 'helmet'
import http from 'http'
import patch from './routes/patch'
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
dynamicPages(app)

http.createServer(app).listen(config.PORT)
