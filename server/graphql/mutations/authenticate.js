import bcrypt from 'bcrypt'

export default async ({debug}, {email, password}, request) => {
    debug(`authenticate(email=${email}, password={password})`)
    email = email.toLowerCase()

    // Fetch person and if doesn't exists return nothing, no error.
    const person = request.data.people.records.find({email}).value()
    if (!person) {
        debug(`authenticate: person "${email}" not found`)
        return false
    }

    // If the password doesn't match, return nothing, no error.
    const challengeSucceeded = await bcrypt.compare(password, person.hash)
    if (!challengeSucceeded) {
        debug(`authenticate: password challenge failed`)
        return false
    }

    // Set session+cookie and return record
    request.session = {
        identifier: person.identifier,
        role: person.role
    }
    return true
}
