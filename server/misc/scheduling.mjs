import db from '../db'
import schedule from 'node-schedule'
import {sendEmail} from './email'

const jobs = new Set()

export const reschedule = () => {
    // Cancel all jobs.
    jobs.forEach(job => job.cancel())
    jobs.clear()

    // Schedule all emails yet to be sent.
    db.emails
        .filter({sent: false})
        .value()
        .forEach(email => {
            const date = new Date(email.sendAt)
            const fn = () => sendEmail(email.identifier)

            if (date < new Date()) {
                fn()
            } else {
                jobs.add(schedule.scheduleJob(date, fn))
            }
        })
}
