import bcrypt from 'bcrypt'
import newAccountTemplate from '../../email-templates/newAccountTemplate.js'
import uuid from 'uuid'

export default async ({Roles}, args, {data, hostname, user}) => {
    // Check that the user has the right to save records.
    if (user.doesNotHaveRole(Roles.STAFF, Roles.ADMINISTRATOR)) {
        throw new Error('401 Unauthorized')
    }

    const identifier = args.input.identifier
    const record = identifier ? data.people.records.find({identifier}).value() : null

	// If we did have an existing records, replace it with the updated information.
    if (record) {
        const replacementRecord = Object.assign({}, record, args.input)
        data.people
            .find({identifier})
            .assign(replacementRecord)
            .write()
        return true
    }

    const {initializeAccount, ...input} = args.input
    const password = uuid()
    const newRecord = Object.assign({}, input, {
        created: new Date().toISOString(),
        hash: initializeAccount ? await bcrypt.hash(password, 10) : null,
        identifier: uuid()
    })
    data.people.push(newRecord).write()

	// TODO: re-enable when ready
    // const emailIdentifier = uuid()
    // if (initializeAccount) {
    //     const email = input.email
    //     data.emails
    //         .push({
    //             content: newAccountTemplate({email, hostname, password}),
    //             identifier: emailIdentifier,
    //             sendAt: new Date().toISOString(),
    //             sent: false,
    //             targets: [email],
    //             title: `Your New Account on ${hostname}`
    //         })
    //         .write()
    //     await sendEmail(emailIdentifier)
    // }

    return true
}
