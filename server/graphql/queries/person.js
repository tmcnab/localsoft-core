export default async ({Roles}, {identifier}, {data, session}) => {
    if (session.hasRole(Roles.STAFF, Roles.ADMINISTRATOR)) {
        return data
            .get('people')
            .find({identifier})
            .value()
    }

    throw new Error('401 Unauthorized')
}
