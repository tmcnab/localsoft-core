import compression from 'compression'
import config from '../config.js'
import cookieSession from 'cookie-session'
import data from './data.js'
import express from 'express'
import helmet from 'helmet'
import user from './user.js'

export default {
    registerWith: app => {
        app.use(compression())
        app.use(helmet())
        app.use(express.json())
        app.use(express.urlencoded({extended: false}))

        app.use(
            cookieSession({
                secret: config.SECRET,
                secure: config.PRODUCTION // true in production
            })
        )

        app.use(data())
        app.use(user())
    }
}
