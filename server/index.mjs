import {init} from './files'
import compression from 'compression'
import cookieSession from 'cookie-session'
import config from './config'
import express from 'express'
import expressGraphQL from 'express-graphql'
import helmet from 'helmet'
import http from 'http'
import schema from './schema'


// Create data directory if not exists
init()

// Create app and configure settings.
const app = express()
app.set('port', config.PORT)
app.set('trust proxy', config.PRODUCTION)


// Register middlewares.
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieSession({
    secret: config.SECRET,
    secure: config.PRODUCTION,      // true in production
}))
app.use(helmet())
app.use('/graphql', expressGraphQL({
    graphiql: !config.PRODUCTION,
    schema,
}))


// In production we serve the build directory from static
if (config.PRODUCTION) {
    app.use(express.static(config.BUILD_DIR))
}


const server = http.createServer(app).listen(config.PORT)
process.on('SIGNERM', () => server.close())
process.on('SIGINT', () => server.close())
