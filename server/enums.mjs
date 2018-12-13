const toEnumObject = (...args) => {
    const object = args.reduce((object, name) => {
        object[name] = name
        return object
    }, {})
    return Object.freeze(object)
}

export const Features = toEnumObject(
    'CONVERSATIONS',
    'EMAIL',
    'EVENTS',
    'FILES',
    'FORUMS',
    'PAGES',
    'PEOPLE',
    'SETTINGS',
    'UPDATES'
)

export const Roles = toEnumObject('ANONYMOUS', 'MEMBER', 'STAFF', 'ADMINISTRATOR')
