export default async ({Roles}, args, {data, user}) => {
    if (user.hasRole(Roles.STAFF, Roles.ADMINISTRATOR)) {
        return data.people.records
            .map('tags')
            .flatten()
            .uniq()
            .value()
    }

    return []
}
