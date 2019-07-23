export default async ({Roles}, {identifier}, {data, user}) => {
    // Only authorized users may destroy other person records.
    if (user.doesNotHaveRole(Roles.STAFF, Roles.ADMINISTRATOR)) {
        return false
    }

    // No-one can destroy themselves.
    if (user.identifier === identifier) {
        return false
    }

    // Ensure we don't delete the only administrator.
    const record = data.people.records.find({identifier}).value()
    const administratorCount = data.people
        .filter(['role', Roles.ADMINISTRATOR])
        .size()
        .value()
    if (record.role === Roles.ADMINISTRATOR && administratorCount <= 1) {
        return false
    }

    // Staff cannot delete administrators.
    if (user.role === Roles.STAFF && record.role === Roles.ADMINISTRATOR) {
        return false
    }

    // Finally destroy the record.
    data.people.records.remove({identifier}).write()
    return true
}
