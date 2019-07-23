export default async ({Roles}, args, {data, user}) => {
    if (user.doesNotHaveRole(Roles.STAFF, Roles.ADMINISTRATOR)) {
        throw new Error('401 Unauthorized')
    }

    return data.people.records.value()
}
