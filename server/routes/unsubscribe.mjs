/**
 * Unsubscribe.
 *
 * Anyone who has received an email from the system can unsubscribe from emails by clicking a link at the base of the
 * email. This link is a simple `GET:/unsubscribe/?email=email`. The key consists of a SHA1 hash of the
 * Person's identifier and the email identifier
 *
 */
import db from '../db'

export default (request, response) => {
    const email = request.query.trim().toLowerCase()
    const record = db
        .get('people')
        .find({email})
        .value()

    if (record) {
        record.preferences.email = false
        db.get('people')
            .find({email})
            .assign(record)
            .write()
    }

    response.render('unsubscribe')
}
