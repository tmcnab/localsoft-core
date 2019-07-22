import config from '../config.js'
import db from '../db.js'
import express from 'express'
import {FeaturePaths} from '../enums.js'
import path from 'path'

export default app => {
    const jekyllIndexFile = path.join(config.JEKYLL_BUILD_DIR, 'index.html')
    app.get('/', (request, response) => response.sendFile(jekyllIndexFile))

    app.use(express.static(config.JEKYLL_BUILD_DIR))
    app.use(express.static(config.REACT_BUILD_DIR))

    // Serve up the Single Page App on paths that have features enabled.
    const featurePaths = config.ENABLED_FEATURES.map(feature => FeaturePaths[feature])
    const reactIndexFile = path.join(config.REACT_BUILD_DIR, 'index.html')
    app.get(featurePaths, (request, response) => response.sendFile(reactIndexFile))

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

        const title = page.title.replace(/ /g, '-')
        const name = page.post ? `posts/${page.published.split('T')[0]}/${title}.html` : `${title}.html`
        const file = path.join(config.JEKYLL_BUILD_DIR, name)
        response.sendFile(file)
    })

    // Error Handler.
    app.use((error, request, response) => {
        const file = path.join(config.JEKYLL_BUILD_DIR, '404.html')
        response.status(404).sendFile(file)
    })
}
