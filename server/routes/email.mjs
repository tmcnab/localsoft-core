// https://github.com/leemunroe/responsive-html-email-template
import __dirname from '../__dirname'
import config from '../config'
import db from '../db'
import fs from 'fs'
import kramed from 'kramed'
import path from 'path'

// <!-- CONTENT HERE -->
// <!-- ADDRESS HERE -->
// <!-- UNSUBSCRIBE HERE -->

const file = path.join(__dirname, 'email-inlined.html')
const htmlContent = fs.readFileSync(file).toString()

export const generateHtml = (content, email) => {
    let html = htmlContent.replace('<!-- CONTENT HERE -->', kramed(content))

    if (email) {
        html = html.replace('<!-- UNSUBSCRIBE HERE -->', `${config.SITE_URL}/unsubscribe?email=${email}`)
    }

    return html
}

export default async (request, response, next) => {
    const {identifier} = request.params
    const email = db.emails.find({identifier}).value()

    if (!identifier) {
        const error = new Error()
        error.statusCode = 404
        next(error)
    }

    const html = generateHtml(email.content)
    response.set('Content-Type', 'text/html')
    response.send(new Buffer(html))
}
