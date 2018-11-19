export const Features = {
    FORUMS: Symbol(),
}

const Role = {
    ANONYMOUS: Symbol(),        // Non-Authenticated User
    MEMBER: Symbol(),           // Authenticated User which can control themselves
    ORGANIZER: Symbol(),        // Authenticated User which can control data
    ADMINISTRATOR: Symbol(),    // Authenticated User which can control features
}

const Settings = {
    [Features.FORUMS]: {
        minReadRole: Role.MEMBER,
        minWriteRole: Role.MEMBER,
    }
}

export const userCanViewFeature = (feature) =>
    true    // TODO
