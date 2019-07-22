import db from '../db.js'
import {generateEmailContent} from '../misc/email.js'
import {Roles} from '../enums.js'

// Renders markdown the user is editing as it will appear in browser/email [POST:/email]
export const emailPreview = async (request, response, next) => {
    // Only staff and admins can use this feature.
    if (!request.session.hasRole([Roles.STAFF, Roles.ADMINISTRATOR])) {
        return next()
    }

    const {html} = generateEmailContent(request.body)
    response.set('Content-Type', 'text/html')
    response.send(html)
}

// Renders an email in the browser [GET:/email/:identifier]
export const emailRender = async (request, response, next) => {
    const {identifier} = request.params
    const email = db.emails.find({identifier}).value()
    if (!email) {
        return next()
    }

    const {html} = generateEmailContent(email.content)
    response.set('Content-Type', 'text/html')
    response.send(html)
}

// Unsubscribe from email delivery [GET:/email/unsubscribe?email=:email]
export const emailUnsubscribe = async (request, response) => {
    const email = request.query.email.trim().toLowerCase()
    const person = db.people.find({email}).value()

    if (person) {
        person.preferences.email = false
        db.people
            .find({email})
            .assign(person)
            .write()
    }

    response.set('Content-Type', 'text/html')
    response.send(`
        <!doctype html>
        <html>
            <body>
                <h1>Unsubscribe Successful</h1>
                <p>You can close this now.</p>
            </body>
        </html>
    `)
}
