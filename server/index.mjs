import cookieSession from 'cookie-session'
import config from './config'
import express from 'express'
import helmet from 'helmet'
import http from 'http'
import path from 'path'


const app = express()
const port = 3001


// Configuration app settings.
app.set('port', config.PORT)
app.set('trust proxy', config.PRODUCTION)


// Register middlewares.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieSession({
    secret: config.SECRET,
    secure: config.PRODUCTION,      // true in production
}))
app.use(helmet())


// In production we serve the build directory from static
if (config.PRODUCTION) {
    app.use(express.static(config.BUILD_DIR))
}


http.createServer(app).listen(config.PORT)
