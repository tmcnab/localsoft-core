import __dirname from '../__dirname.js'
import config from '../config.js'
import db from '../db.js'
import fs from 'fs'
import kramed from 'kramed'
import nodemailer from 'nodemailer'
import path from 'path'
import TextRenderer from 'kramed-text-renderer'

const transporter = nodemailer.createTransport(config.EMAIL)

export const generateEmailContent = (content, email) => {
    // https://github.com/leemunroe/responsive-html-email-template
    const file = path.join(__dirname, 'email-inlined.html')

    let html = fs
        .readFileSync(file)
        .toString()
        .replace('<!-- CONTENT HERE -->', kramed(content))
    if (email) {
        html = html.replace('<!-- UNSUBSCRIBE HERE -->', `${config.SITE_URL}/unsubscribe?email=${email}`)
    }

    // TODO: also return a `text` member which is just plaintext
    return {html}
}

export const sendEmail = async identifier => {
    const record = db.emails.find({identifier}).value()
    if (!record) {
        return new Error(`email '${identifier}' not found`)
    }

    const bcc = record.targets.reduce((addresses, value) => {
        if (value.includes('@')) {
            addresses.add(value.toLowerCase())
        }

        // TODO: handle tagged users

        return addresses
    }, new Set())

    try {
        const {html} = generateEmailContent(record.content)
        const result = await transporter.sendMail({
            bcc: Array.from(bcc),
            from: 'noreply@domain',
            html,
            messageId: record.identifier,
            subject: record.title
        })
        return
    } catch (error) {
        console.error('error', error)
        return error
    }
}
