import compression from 'compression'
import config from '../config.js'
import cookieSession from 'cookie-session'
import express from 'express'
import helmet from 'helmet'

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

        app.use((req, res, next) => {
            // Make sure every session has a role, even if ANONYMOUS
            req.session.role = req.session.role || 'ANONYMOUS'
            req.session.hasRole = (...roles) => roles.includes(req.session.role)
            next()
        })
    }
}
