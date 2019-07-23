import config from './config.js'
import express from 'express'
import graphql from './graphql/index.js'
import http from 'http'
import middleware from './middleware/index.js'
import routes from './routes/index.js'

// Create app and configure settings.
const app = express()
app.set('port', config.PORT)
app.set('trust proxy', config.PRODUCTION)

// Register a bunch of subsystems.
middleware.registerWith(app)
graphql.registerWith(app)
routes.registerWith(app)

// Start it up.
http.createServer(app).listen(config.PORT)
